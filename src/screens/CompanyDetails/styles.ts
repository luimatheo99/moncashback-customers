import { FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
    getStatusBarHeight,
    getBottomSpace,
} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { ICashbackDTO } from '../../dtos/ICashbackDTO';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 160px;
    padding: 0 18px;

    background-color: ${({ theme }) => theme.colors.main};

    align-items: center;
`;

export const HeaderTop = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;

    margin-top: ${getStatusBarHeight()}px;
`;

export const Category = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;

    text-transform: uppercase;
`;

export const PhotoContainer = styled.View`
    width: 200px;
    height: 130px;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors.shape};
    margin-top: 25px;
`;

export const Photo = styled.Image`
    width: 200px;
    height: 130px;
    border-radius: 8px;
`;

export const Content = styled.View`
    padding: 0 24px;
    margin-top: 80px;
    margin-bottom: ${getBottomSpace() + 150}px;

    align-items: center;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(25)}px;

    text-align: center;
`;

export const AddressView = styled.View`
    padding: 12px 40px;
`;

export const AddressText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(14)}px;

    text-align: center;
`;

export const Informations = styled.View`
    height: 55px;
    border-radius: 30px;
    margin-top: 5px;

    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const IconButton = styled(BorderlessButton)``;

export const Section = styled.View`
    margin-bottom: 16px;
`;

export const CashbackList = styled(
    FlatList as new () => FlatList<ICashbackDTO>,
).attrs({
    contentContainerStyle: {
        marginTop: 10,
    },
    showsVerticalScrollIndicator: false,
})`
    margin-top: 10px;
`;
