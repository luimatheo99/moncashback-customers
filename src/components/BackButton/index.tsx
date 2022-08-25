import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container } from './styles';

interface IProps extends BorderlessButtonProps {
    color?: string;
}

export function BackButton({ color, ...rest }: IProps) {
    const theme = useTheme();

    return (
        <Container {...rest}>
            <MaterialIcons
                name="chevron-left"
                size={30}
                color={color || theme.colors.text}
            />
        </Container>
    );
}
