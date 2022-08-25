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
import { PasswordInputForm } from '../../../components/PasswordInputForm';
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
    code: Yup.number().required('Código é obrigatório'),
    password: Yup.string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter no mínimo 6 carácteres'),
    passwordConfirm: Yup.string()
        .required('Confirmação da senha é obrigatória')
        .min(6, 'Confirmação deve ter no mínimo 6 carácteres'),
});

interface IFormData {
    code: string;
    password: string;
    passwordConfirm: string;
}

export function ResetPassword() {
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
            const { code } = data;
            const { password } = data;
            const { passwordConfirm } = data;

            if (password !== passwordConfirm) {
                setLoadButton(false);
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: 'As senhas não são iguais',
                    position: 'bottom',
                });
                return;
            }

            const response = await api.post(
                `/user/password/reset?code=${code}`,
                {
                    password,
                },
            );

            console.log(response.data);

            setLoadButton(false);
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Senha alterada com sucesso',
                position: 'bottom',
            });

            navigation.navigate('SignIn' as any);
        } catch (error) {
            setLoadButton(false);
            Toast.show({
                type: 'error',
                text1: 'Opa',
                text2: 'Código informado é diferente do código que enviamos por SMS',
                position: 'bottom',
            });
        }
    };

    async function handleNotAlreadyCode() {
        navigation.goBack();
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
                                <Bullet />
                                <Bullet active />
                            </Steps>
                        </Header>

                        <Title>Resetar senha</Title>
                        <Form>
                            <InputForm
                                control={control}
                                name="code"
                                placeholder="Código"
                                keyboardType="numeric"
                                autoCapitalize="sentences"
                                error={errors.code && errors.code.message}
                            />
                            <PasswordInputForm
                                control={control}
                                name="password"
                                placeholder="Senha"
                                autoCapitalize="sentences"
                                autoCorrect={false}
                                error={
                                    errors.password && errors.password.message
                                }
                            />
                            <PasswordInputForm
                                control={control}
                                name="passwordConfirm"
                                placeholder="Repetir Senha"
                                autoCapitalize="sentences"
                                autoCorrect={false}
                                error={
                                    errors.passwordConfirm &&
                                    errors.passwordConfirm.message
                                }
                            />
                        </Form>

                        <Button
                            title="Resetar senha"
                            onPress={handleSubmit(handleRecoverPassword)}
                            color={theme.colors.success}
                            enabled={loadButton}
                            loading={loadButton}
                        />

                        <AlreadyCodeView>
                            <AlreadyCodeButton onPress={handleNotAlreadyCode}>
                                <AlreadyCodeTitle>
                                    Não tenho código
                                </AlreadyCodeTitle>
                            </AlreadyCodeButton>
                        </AlreadyCodeView>
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
