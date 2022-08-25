import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Platform, Linking, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Cashback } from '../../components/Cashback';
import { Load } from '../../components/Load';
import { ICashbackDTO } from '../../dtos/ICashbackDTO';
import { ICompanyDTO } from '../../dtos/ICompanyDTO';
import { api } from '../../services/api';
import {
    Container,
    Header,
    HeaderTop,
    Category,
    PhotoContainer,
    Photo,
    Name,
    Content,
    Section,
    AddressView,
    AddressText,
    Informations,
    IconButton,
    CashbackList,
} from './styles';

export function CompanyDetails() {
    const route = useRoute();
    const company = route.params as ICompanyDTO;

    const [loading, setLoading] = useState(true);
    const [cashbacks, setCashbacks] = useState<ICashbackDTO[]>([]);

    const theme = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        let isMounted = true;

        async function fetchCompanies() {
            try {
                const { data } = await api.get(
                    `/cashbacks/company/${company.id}`,
                );

                if (isMounted) {
                    setCashbacks(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCompanies();
        return () => {
            isMounted = false;
        };
    }, []);

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <Header>
                <HeaderTop>
                    <BackButton
                        color={theme.colors.shape}
                        onPress={handleBack}
                    />
                    <Category>
                        <Ionicons name={company.category.icon} size={18} />
                        {` ${company.category.name}`}
                    </Category>
                </HeaderTop>
                <PhotoContainer>
                    {!!company.logo && <Photo source={{ uri: company.logo }} />}
                </PhotoContainer>
            </Header>

            {loading ? (
                <Load />
            ) : (
                <>
                    <Content>
                        <Section>
                            <Name numberOfLines={1}>{company.name}</Name>
                            <AddressView>
                                <AddressText numberOfLines={2}>
                                    {`${company?.street}, ${company?.number} - ${company?.district}, ${company.city.name} - ${company.state.uf}`}
                                </AddressText>
                            </AddressView>
                            <Informations>
                                {company?.phone && (
                                    <>
                                        <IconButton
                                            onPress={() => {
                                                Linking.openURL(
                                                    `whatsapp://send?text=Olá!&phone=55${company.phone}`,
                                                );
                                            }}
                                        >
                                            <Ionicons
                                                name="logo-whatsapp"
                                                size={24}
                                                color={theme.colors.shape}
                                            />
                                        </IconButton>
                                        <IconButton
                                            onPress={() => {
                                                if (Platform.OS !== 'android') {
                                                    Linking.openURL(
                                                        `telprompt:${company.phone}`,
                                                    );
                                                } else {
                                                    Linking.openURL(
                                                        `tel:${company.phone}`,
                                                    );
                                                }
                                            }}
                                        >
                                            <Ionicons
                                                name="call"
                                                size={24}
                                                color={theme.colors.shape}
                                            />
                                        </IconButton>
                                    </>
                                )}
                                {company?.facebook_url?.length > 0 && (
                                    <IconButton
                                        onPress={() => {
                                            Linking.openURL(
                                                company.facebook_url,
                                            );
                                        }}
                                    >
                                        <Ionicons
                                            name="logo-facebook"
                                            size={24}
                                            color={theme.colors.shape}
                                        />
                                    </IconButton>
                                )}
                                {company?.site_url?.length > 0 && (
                                    <IconButton
                                        onPress={() => {
                                            Linking.openURL(company.site_url);
                                        }}
                                    >
                                        <Ionicons
                                            name="globe-outline"
                                            size={24}
                                            color={theme.colors.shape}
                                        />
                                    </IconButton>
                                )}
                                {company?.instagram_url?.length > 0 && (
                                    <IconButton
                                        onPress={() => {
                                            Linking.openURL(
                                                company?.instagram_url,
                                            );
                                        }}
                                    >
                                        <Ionicons
                                            name="logo-instagram"
                                            size={24}
                                            color={theme.colors.shape}
                                        />
                                    </IconButton>
                                )}
                            </Informations>
                            <CashbackList
                                data={cashbacks}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <Cashback data={item} />
                                )}
                            />
                        </Section>
                    </Content>
                </>
            )}
        </Container>
    );
}
