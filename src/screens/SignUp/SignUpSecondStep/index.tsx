import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInputForm } from '../../../components/PasswordInputForm';
import { useAuth } from '../../../hooks/auth';
import { api } from '../../../services/api';
import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
} from './styles';

interface IParams {
    user: {
        name: string;
        email: string;
        phone: string;
        birthDate: string;
        genre: string;
    };
}

const schema = Yup.object().shape({
    password: Yup.string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter no mínimo 6 carácteres'),
    passwordConfirm: Yup.string()
        .required('Confirmação da senha é obrigatória')
        .min(6, 'Confirmação deve ter no mínimo 6 carácteres'),
});

interface IFormData {
    password: string;
    passwordConfirm: string;
}

export function SignUpSecondStep() {
    const [loadButton, setLoadButton] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const { signIn } = useAuth();

    const { user } = route.params as IParams;

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

    const handleRegister = async (data: IFormData) => {
        setLoadButton(true);

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

        const day = user.birthDate.split('/')[0];
        const month = user.birthDate.split('/')[1];
        const year = user.birthDate.split('/')[2];
        user.birthDate = `${year}-${month}-${day}`;

        try {
            const { data } = await api.post('/user', {
                name: user.name,
                email: user.email,
                phone: user.phone
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', ''),
                genre: user.genre,
                birth_date: user.birthDate,
                password,
            });

            if (!data.success) {
                setLoadButton(false);
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: `${data.message}`,
                    position: 'bottom',
                });
                return;
            }

            Toast.show({
                type: 'success',
                text1: 'Conta criada',
                text2: 'Seja bem vindo!',
                position: 'bottom',
            });

            signIn({ login: user.email, password });
        } catch (error) {
            setLoadButton(false);
            Toast.show({
                type: 'error',
                text1: 'Opa',
                text2: 'Não foi possível cadastrar',
                position: 'bottom',
            });
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
                <ScrollView>
                    <Container>
                        <Header>
                            <BackButton onPress={handleBack} />
                            <Steps>
                                <Bullet />
                                <Bullet active />
                            </Steps>
                        </Header>

                        <Title>Crie sua conta</Title>
                        <Subtitle>
                            Faça seu cadastro de{'\n'}
                            forma rápida e fácil
                        </Subtitle>

                        <Form>
                            <FormTitle>2. Senha</FormTitle>
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
                            <PasswordInputForm
                                control={control}
                                name="passwordConfirm"
                                placeholder="Repetir Senha"
                                autoCapitalize="none"
                                autoCorrect={false}
                                error={
                                    errors.passwordConfirm &&
                                    errors.passwordConfirm.message
                                }
                            />
                        </Form>

                        <Button
                            color={theme.colors.success}
                            title="Cadastrar"
                            onPress={handleSubmit(handleRegister)}
                            disabled={loadButton}
                            loading={loadButton}
                        />
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
