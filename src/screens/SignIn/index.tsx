import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StatusBar,
    BackHandler,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import LogoSvg from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { InputForm } from '../../components/InputForm';
import { PasswordInputForm } from '../../components/PasswordInputForm';
import { useAuth } from '../../hooks/auth';
import theme from '../../styles/theme';
import {
    Container,
    Header,
    Form,
    ForgotView,
    ForgotButton,
    ForgotTitle,
} from './styles';

interface IFormData {
    login: string;
    password: string;
}

const schema = Yup.object().shape({
    login: Yup.string().required('E-mail / Telefone é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
});

export function SignIn() {
    const [loadButton, setLoadButton] = useState(false);

    const navigation = useNavigation();
    const { signIn } = useAuth();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function handleOpenForgotPassword() {
        navigation.navigate('ForgotPassword' as any);
        reset();
    }

    const handleSignIn = async (data: IFormData) => {
        try {
            setLoadButton(true);
            await signIn({ login: data.login, password: data.password });

            setLoadButton(false);
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
                    text2: 'Ocorreu um erro ao fazer login, verifique as credenciais',
                    position: 'bottom',
                });
            }
        }
    };

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep' as any);
        reset();
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }, []);

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
                        <StatusBar
                            barStyle="dark-content"
                            backgroundColor="transparent"
                            translucent
                        />
                        <Header>
                            <LogoSvg width={240} height={200} />
                        </Header>
                        <Form>
                            <InputForm
                                control={control}
                                name="login"
                                placeholder="E-mail / Telefone"
                                autoCapitalize="none"
                                error={errors.login && errors.login.message}
                            />

                            <PasswordInputForm
                                control={control}
                                name="password"
                                placeholder="Senha"
                                autoCapitalize="none"
                                autoCorrect={false}
                                error={
                                    errors.password && errors.password.message
                                }
                            />

                            <ForgotView>
                                <ForgotButton
                                    onPress={handleOpenForgotPassword}
                                >
                                    <ForgotTitle>
                                        Esqueci minha senha
                                    </ForgotTitle>
                                </ForgotButton>
                            </ForgotView>
                        </Form>

                        <Button
                            title="Login"
                            color={theme.colors.success}
                            onPress={handleSubmit(handleSignIn)}
                            disabled={loadButton}
                            loading={loadButton}
                        />
                        <Button
                            title="Criar conta gratuita"
                            color={theme.colors.background_secondary}
                            light
                            onPress={handleNewAccount}
                            loading={false}
                        />
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
