import { RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
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

export const PhotoContainer = styled.View`
    width: 180px;
    height: 180px;
    border-radius: 90px;

    background-color: ${({ theme }) => theme.colors.shape};
    margin: 18px 0;
`;

export const Photo = styled.Image`
    width: 180px;
    height: 180px;
    border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
    width: 40px;
    height: 40px;
    bottom: 10px;
    right: 10px;
    border-radius: ${RFPercentage(0.7)}px;

    background-color: ${({ theme }) => theme.colors.main};

    justify-content: center;
    align-items: center;
    position: absolute;
`;

export const Content = styled.View`
    padding: 0 24px;
`;

export const Section = styled.View`
    margin-bottom: 16px;
    align-items: center;
`;

export const Genre = styled.View`
    flex-direction: row;
`;
