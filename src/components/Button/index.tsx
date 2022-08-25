import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface IProps extends RectButtonProps {
    title: string;
    color?: string;
    loading?: boolean;
    light?: boolean;
}

export function Button({
    title,
    color,
    onPress,
    disabled = false,
    loading = false,
    light = false,
}: IProps) {
    const theme = useTheme();

    return (
        <Container
            color={color || theme.colors.main}
            onPress={onPress}
            disabled={disabled}
            style={{
                opacity: disabled || loading === true ? 0.5 : 1,
            }}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.shape} />
            ) : (
                <Title light={light}>{title}</Title>
            )}
        </Container>
    );
}
