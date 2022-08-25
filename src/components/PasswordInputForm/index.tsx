import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, ContainerInput, Input, Error, IconEye } from './styles';

// type Props = TextInputProps & UseControllerProps<any>;
interface IProps extends TextInputProps {
    control: Control;
    name: string;
    error: string;
}

export function PasswordInputForm({ control, name, error, ...rest }: IProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const theme = useTheme();

    function handlePasswordVisibilityChange() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <>
            <Container>
                <ContainerInput isError={error}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={isPasswordVisible}
                                    {...rest}
                                />
                                <BorderlessButton
                                    onPress={handlePasswordVisibilityChange}
                                >
                                    <IconEye>
                                        <Ionicons
                                            name={
                                                isPasswordVisible
                                                    ? 'eye'
                                                    : 'eye-off'
                                            }
                                            size={24}
                                            color={theme.colors.text_detail}
                                        />
                                    </IconEye>
                                </BorderlessButton>
                            </>
                        )}
                        name={name}
                    />
                </ContainerInput>
                {error && <Error>{error}</Error>}
            </Container>
        </>
    );
}
