import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, IconContainer, InputText, Error } from './styles';

interface IProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
    error: string;
}

export function Input({ iconName, value, error, ...rest }: IProps) {
    // const [isFocused, setIsFocused] = useState(false);
    let isFocused;
    isFocused = false;
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    async function handleInputFocus() {
        isFocused = true;
    }

    async function handleInputBlur() {
        isFocused = false;
        setIsFilled(!!value);
    }

    return (
        <Container isFocused={isFocused}>
            <IconContainer>
                <Ionicons
                    name={iconName}
                    size={24}
                    color={
                        isFocused || isFilled
                            ? theme.colors.main
                            : theme.colors.text_detail
                    }
                />
            </IconContainer>
            <InputText
                // onFocus={handleInputFocus}
                // onBlur={handleInputBlur}
                {...rest}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}
