import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { ICompanyDTO } from '../../dtos/ICompanyDTO';

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 80px;
    padding: 0 24px;

    background-color: ${({ theme }) => theme.colors.main};

    flex-direction: row;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.shape};
`;

export const CompanyList = styled(
    FlatList as new () => FlatList<ICompanyDTO>,
).attrs({
    contentContainerStyle: {
        padding: 24,
    },
    showsVerticalScrollIndicator: false,
})``;
