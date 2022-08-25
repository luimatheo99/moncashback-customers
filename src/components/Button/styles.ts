import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IButtonProps {
    color: string;
}

interface IButtonTextProps {
    light: boolean;
}

export const Container = styled.TouchableOpacity<IButtonProps>`
    width: 100%;

    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};
    margin-bottom: 8px;
    border-radius: 4px;
`;

export const Title = styled.Text<IButtonTextProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme, light }) =>
        light ? theme.colors.header : theme.colors.shape};
`;
