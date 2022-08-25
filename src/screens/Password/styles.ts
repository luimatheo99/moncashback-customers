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

export const Content = styled.ScrollView`
    padding: 0 24px;
    margin: 16px 0;
`;

export const Section = styled.View`
    margin-bottom: 16px;
    align-items: center;
`;
