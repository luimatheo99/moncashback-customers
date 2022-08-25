import { TextInput } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../styles/theme';

type InputProps = {
    [key: string]: any;
    isError: boolean;
};

export const Container = styled.View`
    margin: ${RFPercentage(1)}px 0;
`;

export const ContainerInput = styled.View<InputProps>`
    width: 100%;
    flex-direction: row;

    background-color: ${({ theme }) => theme.colors.background_secondary};
    border-radius: ${RFPercentage(0.7)}px;
    border-width: 1px;
    border-color: ${({ isError, theme }) =>
        isError ? theme.colors.attention : 'white'};
`;

export const Input = styled(TextInput)`
    flex: 1;
    padding: ${RFPercentage(3)}px;

    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
`;

export const Error = styled.Text`
    color: ${({ theme }) => theme.colors.attention};
    margin: ${RFPercentage(0.5)}px;
`;

export const IconEye = styled.View`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;

    border-radius: 4px;

    background-color: ${({ theme }) => theme.colors.background_secondary};
`;
