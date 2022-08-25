import { useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    StatusBar,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    BackHandler,
    Dimensions,
} from 'react-native';
import { useTheme } from 'styled-components';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { Feather } from '@expo/vector-icons';

import { Load } from '../../components/Load';
import { Transaction } from '../../components/Transaction';
import { IMovimentationDTO } from '../../dtos/IMovimentationDTO';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import {
    Container,
    Header,
    HeaderContent,
    ContentPhoto,
    Photo,
    UserName,
    ExtractTitle,
    Card,
    CardContent,
    CardText,
    CardTextBold,
    TransactionList,
    NoTransactionView,
    NoTransactionText,
    HamburgerButton,
    ContentName,
} from './styles';

export function Home() {
    const { user, getUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [movimentations, setMovimentations] = useState<IMovimentationDTO[]>(
        [],
    );

    const { width: screenWidth, height: screenHeight } =
        Dimensions.get('window');

    const carouselRef = useRef(null);
    const navigation = useNavigation();
    const theme = useTheme();

    async function fetchExtracts() {
        try {
            const { data } = await api.get('/movimentations/bycustomer');

            setMovimentations(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchExtracts();
        setLoading(false);
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);

        await getUser(user.id);
        await fetchExtracts();

        setRefreshing(false);
    };

    const navigateToDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer());
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <ContentPhoto
                        colors={[theme.colors.secondary, theme.colors.main]}
                    >
                        <Photo source={{ uri: user.avatar_url }} />
                    </ContentPhoto>
                    <ContentName>
                        <UserName numberOfLines={1}>Olá, {user.name}</UserName>
                    </ContentName>
                    <HamburgerButton onPress={navigateToDrawer}>
                        <Feather
                            name="menu"
                            size={30}
                            color={theme.colors.shape}
                        />
                    </HamburgerButton>
                </HeaderContent>
            </Header>
            {loading ? (
                <Load />
            ) : (
                <>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            <Card
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <CardContent>
                                    <CardText>Seu saldo</CardText>
                                    <CardTextBold>
                                        {user.balance ? (
                                            <>
                                                {new Intl.NumberFormat(
                                                    'pt-BR',
                                                    {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    },
                                                ).format(user.balance)}
                                            </>
                                        ) : (
                                            <>
                                                {new Intl.NumberFormat(
                                                    'pt-BR',
                                                    {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    },
                                                ).format(0)}
                                            </>
                                        )}
                                    </CardTextBold>
                                </CardContent>

                                <CardContent>
                                    <CardText>Código MON</CardText>
                                    <CardTextBold>{user.code}</CardTextBold>
                                </CardContent>
                            </Card>
                            <ExtractTitle>Transações</ExtractTitle>
                            {movimentations.length > 0 ? (
                                <TransactionList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                    data={movimentations}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <Transaction data={item} />
                                    )}
                                />
                            ) : (
                                <NoTransactionView>
                                    <NoTransactionText>
                                        Nenhuma transação encontrada. 😥
                                    </NoTransactionText>
                                </NoTransactionView>
                            )}
                        </ScrollView>
                    </SafeAreaView>
                </>
            )}
        </Container>
    );
}
