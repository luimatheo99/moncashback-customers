import { BorderlessButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 80px;
    padding: 0 16px;

    background-color: ${({ theme }) => theme.colors.main};

    flex-direction: row;
    align-items: center;
`;

export const HeaderTitleView = styled.View`
    margin-left: 10px;
`;

export const HeaderTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
    padding: 12px 24px;
    margin-bottom: ${getBottomSpace() + 150}px;

    align-items: center;
`;

export const Footer = styled.View`
    width: 100%;

    margin-top: 5px;
`;

export const RegulationButton = styled(BorderlessButton)`
    width: 100%;
    margin-top: 12px;
    align-items: center;
`;

export const Regulation = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};

    text-decoration: underline;
`;
