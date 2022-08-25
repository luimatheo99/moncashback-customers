import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight() + 1}px;
    align-items: center;
`;

export const Form = styled.View`
    width: 100%;
    margin: 24px 0px 5px 0px;
`;

export const ForgotView = styled.View`
    width: 100%;

    align-items: flex-end;
    justify-content: center;
    margin-bottom: 14px;
`;

export const ForgotButton = styled.TouchableOpacity``;

export const ForgotTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`;
