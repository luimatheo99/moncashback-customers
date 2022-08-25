import { TextInputMask } from 'react-native-masked-text';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IContainerProps {
    isFocused: boolean;
}

export const Container = styled.View<IContainerProps>`
    flex-direction: row;

    margin-bottom: 8px;

    ${({ isFocused, theme }) =>
        isFocused &&
        css`
            border-bottom-width: 2px;
            border-bottom-color: ${theme.colors.main};
        `};
`;

export const IconContainer = styled.View`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;

    margin-right: 6px;
    border-radius: 4px;

    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const MaskInputText = styled(TextInputMask)`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background_secondary};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    padding: 0 23px;
    border-radius: 4px;
`;
