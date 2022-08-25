import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';

import { Company } from '../../components/Company';
import { Load } from '../../components/Load';
import { ICompanyDTO } from '../../dtos/ICompanyDTO';
import { api } from '../../services/api';
import { Container, Header, CompanyList, HeaderTitle } from './styles';

export function Companies() {
    const [companies, setCompanies] = useState<ICompanyDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    function handleCompanyDetails(company: ICompanyDTO) {
        navigation.navigate('CompanyDetails', company);
    }

    async function fetchCompanies() {
        try {
            const { data } = await api.get('/companies');
            setCompanies(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCompanies();
        setLoading(false);
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);

        await fetchCompanies();

        setRefreshing(false);
    };

    return (
        <Container>
            <Header>
                <HeaderTitle>Listagem</HeaderTitle>
            </Header>
            {loading ? (
                <Load />
            ) : (
                <CompanyList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={companies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Company
                            data={item}
                            onPress={() => handleCompanyDetails(item)}
                        />
                    )}
                />
            )}
        </Container>
    );
}
