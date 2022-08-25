import { TextInput } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type InputProps = {
    [key: string]: any;
    isError: boolean;
};

export const Container = styled.View`
    width: 100%;
    margin: ${RFPercentage(1)}px 0;
`;

export const Input = styled(TextInput)<InputProps>`
    width: 100%;
    padding: ${RFPercentage(3)}px;

    background-color: ${({ theme }) => theme.colors.background_secondary};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    border-width: 1px;
    border-color: ${({ isError, theme }) =>
        isError ? theme.colors.attention : 'white'};
    border-radius: ${RFPercentage(0.7)}px;
`;

export const Error = styled.Text`
    color: ${({ theme }) => theme.colors.attention};
    margin: ${RFPercentage(0.5)}px;
`;
