import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { PasswordInputForm } from '../../components/PasswordInputForm';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import {
    Container,
    Header,
    HeaderTitle,
    Content,
    Section,
    HeaderTitleView,
} from './styles';

interface IFormData {
    password: string;
    repeatPassword: string;
    newPassword: string;
}

const schema = Yup.object().shape({
    password: Yup.string().required('Senha atual é obrigatória'),
    repeatPassword: Yup.string()
        .required('Repita a senha é obrigatória')
        .min(6, 'A senha deve ter no mínimo 6 carácteres'),
    newPassword: Yup.string()
        .required('Nova senha é obrigatória')
        .min(6, 'A senha deve ter no mínimo 6 carácteres'),
});

export function Password() {
    const { user, updatedUser } = useAuth();
    const [loadButton, setLoadButton] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const theme = useTheme();
    const { reset } = useNavigation();

    const handleGoToHome = useCallback(() => {
        reset({
            routes: [{ name: 'Home' }],
            index: 0,
        });
    }, [reset]);

    const handleProfileUpdate = async (formData: IFormData) => {
        setLoadButton(true);
        try {
            if (formData.newPassword && formData.repeatPassword) {
                if (formData.newPassword !== formData.repeatPassword) {
                    setLoadButton(false);
                    Toast.show({
                        type: 'error',
                        text1: 'Opa',
                        text2: 'As senhas não são iguais',
                        position: 'bottom',
                    });
                    return;
                }
            }

            const responsePassword = await api.get(
                `/user/password=${formData.password}`,
            );
            if (!responsePassword.data.success) {
                setLoadButton(false);
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: `${responsePassword.data.message}`,
                    position: 'bottom',
                });
                return;
            }

            const day = user.birth_date.split('/')[0];
            const month = user.birth_date.split('/')[1];
            const year = user.birth_date.split('/')[2];
            user.birth_date = `${year?.substr(0, 4)}-${month}-${day}`;

            await updatedUser({
                id: user.id,
                email: user.email,
                name: user.name,
                birth_date: user.birth_date,
                code: user.code,
                genre: user.genre,
                phone: user.phone,
                balance: user.balance,
                password: formData.newPassword,
            });

            setLoadButton(false);

            Toast.show({
                type: 'success',
                text1: 'Senha alterada com sucesso!',
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
                    text2: 'Não foi possível alterar a senha!',
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton
                            onPress={handleGoToHome}
                            color={theme.colors.shape}
                        />
                        <HeaderTitleView>
                            <HeaderTitle>Alterar senha</HeaderTitle>
                        </HeaderTitleView>
                    </Header>
                    <Content>
                        <Section>
                            <PasswordInputForm
                                control={control}
                                name="password"
                                placeholder="Senha Atual"
                                autoCapitalize="sentences"
                                error={
                                    errors.password && errors.password.message
                                }
                            />
                            <PasswordInputForm
                                control={control}
                                name="newPassword"
                                placeholder="Nova senha"
                                autoCapitalize="sentences"
                                error={
                                    errors.newPassword &&
                                    errors.newPassword.message
                                }
                            />
                            <PasswordInputForm
                                control={control}
                                name="repeatPassword"
                                placeholder="Repetir senha"
                                autoCapitalize="sentences"
                                error={
                                    errors.repeatPassword &&
                                    errors.repeatPassword.message
                                }
                            />
                        </Section>
                        <Button
                            color={theme.colors.success}
                            title="Salvar alterações"
                            onPress={handleSubmit(handleProfileUpdate)}
                            enabled={loadButton}
                            loading={loadButton}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
