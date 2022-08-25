import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputMaskProps } from 'react-native-masked-text';
import { useTheme } from 'styled-components';

import { Container, IconContainer, MaskInputText } from './styles';

interface IProps extends TextInputMaskProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    valueBlur: string;
}

export function MaskInput({ iconName, valueBlur, ...rest }: IProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!valueBlur);
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

            <MaskInputText
                // onFocus={handleInputFocus}
                // onEndEditing={handleInputBlur}
                {...rest}
            />
        </Container>
    );
}
