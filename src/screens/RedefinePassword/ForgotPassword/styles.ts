import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    height: 100%;
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: ${getStatusBarHeight() + 31}px;
`;

export const Steps = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(36)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.title};

    margin-top: 26px;
    margin-bottom: 16px;
`;

export const Form = styled.View`
    width: 100%;
    margin-top: 24px;
    margin-bottom: 16px;
`;

export const AlreadyCodeView = styled.View`
    width: 100%;

    align-items: center;
    justify-content: center;
    margin-top: 14px;
`;

export const AlreadyCodeButton = styled.TouchableOpacity``;

export const AlreadyCodeTitle = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`;
