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
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { InputForm } from '../../../components/InputForm';
import { MaskInputForm } from '../../../components/MaskInputForm';
import theme from '../../../styles/theme';
import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
} from './styles';

const radioButtonsData: RadioButtonProps[] = [
    {
        id: 'M',
        label: 'Masculino',
        value: 'M',
        color: theme.colors.main,
        selected: true,
    },
    {
        id: 'F',
        label: 'Feminino',
        value: 'F',
        color: theme.colors.main,
    },
];

interface IFormData {
    name: string;
    email: string;
    phone: string;
    genre: string;
    birthDate: string;
}

const schema = Yup.object().shape({
    birthDate: Yup.string()
        .required('Data de Nascimento é obrigatório')
        .min(10, 'Data de Nascimento inválida'),
    phone: Yup.string()
        .required('Celular é obrigatório')
        .min(14, 'Celular inválido'),
    email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    name: Yup.string().required('Nome é obrigatório'),
});

export function SignUpFirstStep() {
    const [genre, setGenre] = useState('M');

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    function handleBack() {
        navigation.goBack();
    }

    const handleNextStep = async (data: IFormData) => {
        try {
            const dataUser = {
                name: data.name,
                email: data.email,
                phone: data.phone
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', ''),
                genre,
                birthDate: data.birthDate,
            };
            await schema.validate(data);

            navigation.navigate('SignUpSecondStep' as any, { user: dataUser });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: `${error.message}`,
                    position: 'bottom',
                });
            }
        }
    };

    const [radioButtons, setRadioButtons] =
        useState<RadioButtonProps[]>(radioButtonsData);

    async function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
        if (radioButtonsArray[0].selected) {
            setGenre('M');
        } else {
            setGenre('F');
        }
        setRadioButtons(radioButtonsArray);
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

                        <Title>Crie sua conta</Title>
                        <Subtitle>
                            Faça seu cadastro de{'\n'}
                            forma rápida e fácil
                        </Subtitle>

                        <Form>
                            <FormTitle>1. Dados</FormTitle>
                            <InputForm
                                control={control}
                                name="name"
                                placeholder="Nome"
                                autoCapitalize="sentences"
                                error={errors.name && errors.name.message}
                            />
                            <InputForm
                                control={control}
                                name="email"
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                error={errors.email && errors.email.message}
                            />
                            <MaskInputForm
                                control={control}
                                name="phone"
                                type={'cel-phone'}
                                placeholder="Celular"
                                autoCapitalize="none"
                                error={errors.phone && errors.phone.message}
                            />
                            <MaskInputForm
                                control={control}
                                name="birthDate"
                                type={'datetime'}
                                options={{ format: 'DD/MM/YYYY' }}
                                placeholder="Data de Nascimento"
                                autoCapitalize="none"
                                error={
                                    errors.birthDate && errors.birthDate.message
                                }
                            />

                            <RadioGroup
                                radioButtons={radioButtons}
                                onPress={onPressRadioButton}
                                layout="row"
                            />
                        </Form>

                        <Button
                            title="Próximo"
                            onPress={handleSubmit(handleNextStep)}
                        />
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
