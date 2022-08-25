import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IAmountProps {
    type: string;
}

export const Container = styled.View`
    width: 100%;
    padding: 0px 0px 18px 0px;
    /* margin-bottom: 24px; */
    /* border-radius: 4px; */

    /* background-color: ${({ theme }) => theme.colors.background_secondary}; */

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Logo = styled(Image)`
    width: 70px;
    height: 70px;
    border-radius: 8px;
`;

export const PhotoContainer = styled.View`
    width: 70px;
    height: 70px;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors.shape};
    margin-right: 12px;
`;

export const Details = styled.View``;

export const Category = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(16)}px;

    width: ${RFValue(170)}px;
`;

export const CreatedView = styled.View`
    flex-direction: row;
    align-items: center;

    margin-top: 16px;
`;

export const Created = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;

export const Amount = styled.Text<IAmountProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme, type }) =>
        type === 'W' ? theme.colors.green_dark : theme.colors.attention};
    font-size: ${RFValue(16)}px;
`;
