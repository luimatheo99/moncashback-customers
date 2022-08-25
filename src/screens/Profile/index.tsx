import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';
import Toast from 'react-native-toast-message';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { InputForm } from '../../components/InputForm';
import { MaskInputForm } from '../../components/MaskInputForm';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import {
    Container,
    Header,
    HeaderTitle,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Section,
    Genre,
    HeaderTitleView,
} from './styles';

interface IFormData {
    name: string;
    phone: string;
    code: string;
}

const schema = Yup.object().shape({
    phone: Yup.string()
        .required('Celular é obrigatório')
        .min(10, 'Celular inválido'),
    code: Yup.string()
        .required('Código MON é obrigatório')
        .length(6, 'Informe 6 palavras/números no código MON'),
    name: Yup.string().required('Nome é obrigatório'),
});

export function Profile() {
    const { user, updatedUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [loadButton, setLoadButton] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [modifyAvatar, setModifyAvatar] = useState(false);
    const [avatar, setAvatar] = useState('');

    const theme = useTheme();
    const { reset } = useNavigation();

    useEffect(() => {
        setIsLoading(true);

        async function init() {
            try {
                const { data } = await api.get(`/user/getUser/${user.id}`);

                setValue('avatar', data.user.avatar_url);
                setValue('name', data.user.name);
                setValue('email', data.user.email);
                setValue('phone', data.user.phone);
                setValue('code', data.user.code);
                setValue('birth_date', data.user.birth_date);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        init();
    }, []);

    async function handleAvatarSelect() {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri);
            setModifyAvatar(true);
        }
    }

    const handleGoToHome = useCallback(() => {
        reset({
            routes: [{ name: 'Home' }],
            index: 0,
        });
    }, [reset]);

    const handleProfileUpdate = async (formData: IFormData) => {
        setLoadButton(true);
        try {
            const responsePhone = await api.get(
                `/user/phone=${formData.phone
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', '')}`,
            );
            if (!responsePhone.data.success) {
                setLoadButton(false);
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: `${responsePhone.data.message}`,
                    position: 'bottom',
                });
                return;
            }

            const responseCode = await api.get(`/user/code=${formData.code}`);

            if (!responseCode.data.success) {
                setLoadButton(false);
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: `${responseCode.data.message}`,
                    position: 'bottom',
                });
                return;
            }

            const day = user.birth_date.split('/')[0];
            const month = user.birth_date.split('/')[1];
            const year = user.birth_date.split('/')[2];
            user.birth_date = `${year?.substr(0, 4)}-${month}-${day}`;

            if (modifyAvatar) {
                const formData = new FormData();
                formData.append('avatar', {
                    name: avatar,
                    uri:
                        Platform.OS === 'android'
                            ? avatar
                            : avatar.replace('file://', ''),
                    type: mime.getType(avatar),
                });

                console.log(formData);
                await api.patch(`/user/updateUser/${user.id}/avatar`, formData);
                setModifyAvatar(false);
            }

            await updatedUser({
                id: user.id,
                email: user.email,
                name: formData.name,
                birth_date: user.birth_date,
                code: formData.code.toUpperCase(),
                genre: user.genre,
                phone: formData.phone
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', ''),
                balance: user.balance,
                password: '',
            });

            setLoadButton(false);

            Toast.show({
                type: 'success',
                text1: 'Perfil alterado com sucesso!',
                position: 'bottom',
            });

            handleGoToHome();
        } catch (error) {
            setLoadButton(false);
            if (error instanceof Yup.ValidationError) {
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: `${error.message}`,
                    position: 'bottom',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: 'Não foi possível alterar o perfil',
                    position: 'bottom',
                });
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
                backgroundColor: theme.colors.background_primary,
            }}
        >
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Container>
                        <Header>
                            <BackButton
                                onPress={handleGoToHome}
                                color={theme.colors.shape}
                            />
                            <HeaderTitleView>
                                <HeaderTitle>Meu Perfil</HeaderTitle>
                            </HeaderTitleView>
                        </Header>
                        {isLoading ? (
                            <ActivityIndicator style={{ flex: 1 }} />
                        ) : (
                            <Content>
                                <Section>
                                    <PhotoContainer>
                                        {!!avatar && (
                                            <Photo source={{ uri: avatar }} />
                                        )}
                                        <PhotoButton
                                            onPress={handleAvatarSelect}
                                        >
                                            <Feather
                                                name="camera"
                                                size={24}
                                                color={theme.colors.shape}
                                            />
                                        </PhotoButton>
                                    </PhotoContainer>
                                    <InputForm
                                        control={control}
                                        name="name"
                                        placeholder="Nome"
                                        // defaultValue={customer.name}
                                        autoCapitalize="sentences"
                                        error={
                                            errors.name && errors.name.message
                                        }
                                    />
                                    <InputForm
                                        control={control}
                                        name="email"
                                        placeholder="E-mail"
                                        editable={false}
                                        error={
                                            errors.email && errors.email.message
                                        }
                                    />
                                    <MaskInputForm
                                        control={control}
                                        name="phone"
                                        type={'cel-phone'}
                                        placeholder="Celular"
                                        autoCapitalize="sentences"
                                        error={
                                            errors.phone && errors.phone.message
                                        }
                                    />
                                    <MaskInputForm
                                        control={control}
                                        name="birth_date"
                                        type={'datetime'}
                                        placeholder="Data de Nascimento"
                                        options={{
                                            format: 'DD/MM/YYYY',
                                        }}
                                        editable={false}
                                        error={
                                            errors.birth_date &&
                                            errors.birth_date.message
                                        }
                                    />
                                    <InputForm
                                        control={control}
                                        name="code"
                                        placeholder="Código MON"
                                        error={
                                            errors.code && errors.code.message
                                        }
                                    />
                                    <Genre>
                                        <RadioButton
                                            id="M"
                                            label="Masculino"
                                            disabled={true}
                                            selected={user.genre === 'M'}
                                        />
                                        <RadioButton
                                            id="F"
                                            label="Feminino"
                                            disabled={true}
                                            selected={user.genre === 'F'}
                                        />
                                    </Genre>
                                </Section>

                                <Button
                                    color={theme.colors.success}
                                    title="Salvar alterações"
                                    onPress={handleSubmit(handleProfileUpdate)}
                                    enabled={loadButton}
                                    loading={loadButton}
                                />
                            </Content>
                        )}
                    </Container>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
