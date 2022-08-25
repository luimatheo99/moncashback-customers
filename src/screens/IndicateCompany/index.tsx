import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { InputForm } from '../../components/InputForm';
import { MaskInputForm } from '../../components/MaskInputForm';
import { api } from '../../services/api';
import {
    Container,
    Header,
    Content,
    Footer,
    HeaderTitleView,
    HeaderTitle,
    RegulationButton,
    Regulation,
} from './styles';

interface IFormData {
    company: string;
    phone: string;
    name: string;
}

const schema = Yup.object().shape({
    company: Yup.string().required('Estabelecimento é obrigatório'),
    phone: Yup.string()
        .required('Celular é obrigatório')
        .min(14, 'Celular inválido'),
    name: Yup.string().required('Responsável é obrigatório'),
});

export function IndicateCompany() {
    const [loadButton, setLoadButton] = useState(false);

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const theme = useTheme();

    const handleSendIndicateCompany = async (data: IFormData) => {
        setLoadButton(true);

        try {
            const dataPost = {
                name_company: data.company,
                phone: data.phone
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', ''),
                name_responsible: data.name,
            };

            await api.post('/companies/bycustomer/indication', dataPost);

            Toast.show({
                type: 'success',
                text1: 'Enviado com sucesso!',
                position: 'bottom',
            });

            setLoadButton(false);

            reset();
            navigation.navigate('Home');
        } catch (error) {
            setLoadButton(false);
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Não foi possível enviar',
                position: 'bottom',
            });
        }
    };

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} color={theme.colors.shape} />
                <HeaderTitleView>
                    <HeaderTitle>Indicar Estabelecimentos</HeaderTitle>
                </HeaderTitleView>
            </Header>
            <RegulationButton onPress={() => console.log('asdas')}>
                <Regulation>Regulamento</Regulation>
            </RegulationButton>
            <ScrollView>
                <Content>
                    <InputForm
                        control={control}
                        name="company"
                        placeholder="Estabelecimento"
                        autoCapitalize="sentences"
                        error={errors.company && errors.company.message}
                    />
                    <MaskInputForm
                        control={control}
                        name="phone"
                        type={'cel-phone'}
                        placeholder="Celular"
                        autoCapitalize="sentences"
                        error={errors.phone && errors.phone.message}
                    />
                    <InputForm
                        control={control}
                        name="name"
                        placeholder="Responsável"
                        autoCapitalize="sentences"
                        error={errors.name && errors.name.message}
                    />

                    <Footer>
                        <Button
                            color={theme.colors.success}
                            title="Enviar"
                            onPress={handleSubmit(handleSendIndicateCompany)}
                            enabled={loadButton}
                            loading={loadButton}
                        />
                    </Footer>
                </Content>
            </ScrollView>
        </Container>
    );
}
