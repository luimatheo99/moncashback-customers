import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { InputForm } from '../../../components/InputForm';
import { MaskInputForm } from '../../../components/MaskInputForm';
import { api } from '../../../services/api';
import theme from '../../../styles/theme';
import {
    Container,
    Header,
    Steps,
    Title,
    Form,
    AlreadyCodeView,
    AlreadyCodeButton,
    AlreadyCodeTitle,
} from './styles';

const schema = Yup.object().shape({
    phone: Yup.string().required('Celular é obrigatório'),
});

interface IFormData {
    phone: string;
}

export function ForgotPassword() {
    const [loadButton, setLoadButton] = useState(false);

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    function handleBack() {
        navigation.goBack();
    }

    const handleRecoverPassword = async (data: IFormData) => {
        setLoadButton(true);
        try {
            await api.post('/user/password/forgot', {
                phone: data.phone
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', ''),
            });

            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Recuperação de senha enviada por SMS',
                position: 'bottom',
            });
            setLoadButton(false);
            navigation.navigate('ResetPassword' as any);
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
                    text1: 'Erro',
                    text2: 'Ocorreu um erro ao enviar o SMS',
                    position: 'bottom',
                });
            }
        }
    };

    async function handleAlreadyCode() {
        navigation.navigate('ResetPassword' as any);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
                backgroundColor: theme.colors.background_primary,
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <Container>
                        <Header>
                            <BackButton onPress={handleBack} />
                            <Steps>
                                <Bullet active />
                                <Bullet />
                            </Steps>
                        </Header>

                        <Title>Recuperar senha</Title>
                        <Form>
                            <MaskInputForm
                                control={control}
                                name="phone"
                                type={'cel-phone'}
                                placeholder="Celular"
                                autoCapitalize="none"
                                error={errors.phone && errors.phone.message}
                            />
                        </Form>

                        <Button
                            title="Recuperar senha"
                            onPress={handleSubmit(handleRecoverPassword)}
                            color={theme.colors.success}
                            enabled={loadButton}
                            loading={loadButton}
                        />

                        <AlreadyCodeView>
                            <AlreadyCodeButton onPress={handleAlreadyCode}>
                                <AlreadyCodeTitle>
                                    Já tenho código
                                </AlreadyCodeTitle>
                            </AlreadyCodeButton>
                        </AlreadyCodeView>
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
