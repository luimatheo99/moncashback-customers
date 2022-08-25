import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, IconContainer, InputText, IconEye } from './styles';

interface IProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: IProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    function handlePasswordVisibilityChange() {
        setIsPasswordVisible((prevState) => !prevState);
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
                secureTextEntry={isPasswordVisible}
                autoCorrect={false}
                {...rest}
            />

            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconEye>
                    <Ionicons
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconEye>
            </BorderlessButton>
        </Container>
    );
}
