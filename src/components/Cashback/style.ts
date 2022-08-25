import { Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    width: 100%;
    height: 80px;
    padding: 24px;
    margin-bottom: 16px;
    border-radius: 4px;

    background-color: ${({ theme }) => theme.colors.background_secondary};

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Details = styled.View``;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(16)}px;

    text-transform: uppercase;
`;

export const ExpiresView = styled.View`
    flex-direction: row;
    align-items: center;

    margin-top: 16px;
`;

export const ExpiresText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;
