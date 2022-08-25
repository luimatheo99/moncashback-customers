import { LinearGradient } from 'expo-linear-gradient';
import { Image, FlatList, Pressable } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { IMovimentationDTO } from '../../dtos/IMovimentationDTO';

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 80px;
    padding: 10px 10px 0px 24px;

    background-color: ${({ theme }) => theme.colors.main};
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ContentPhoto = styled(LinearGradient)`
    width: 49px;
    height: 49px;
    border-radius: 8px;

    align-items: center;
    justify-content: center;
`;

export const Photo = styled(Image)`
    width: 100%;
    height: 100%;
    border-radius: 8px;
`;

export const ContentName = styled.View`
    max-width: 200px;

    align-items: center;
    justify-content: center;
`;

export const UserName = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.shape};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const ExtractTitle = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.title};

    padding: 10px 0px 0px 24px;
`;

export const Card = styled.ScrollView`
    width: 100%;
    padding: 18px 24px;

    flex-direction: row;
`;

export const CardContent = styled.View`
    margin-right: 12px;
    /* padding: 15px 15px; */
    width: 180px;
    height: 80px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    background-color: ${({ theme }) => theme.colors.orange};
`;

export const CardText = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.shape};
`;

export const CardTextBold = styled.Text`
    font-size: ${RFValue(28)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.shape};
`;

export const TransactionList = styled(
    FlatList as new () => FlatList<IMovimentationDTO>,
).attrs({
    contentContainerStyle: {
        padding: 24,
    },
    showsVerticalScrollIndicator: false,
})``;

export const NoTransactionView = styled.View`
    height: 200px;
    align-items: center;
    justify-content: center;
`;

export const NoTransactionText = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text_detail};
`;

export const HamburgerButton = styled(Pressable)`
    margin: 0px 12px 0px 0px;
`;
