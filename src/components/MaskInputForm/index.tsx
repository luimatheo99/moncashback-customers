import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextInputMaskProps } from 'react-native-masked-text';

import { Container, MaskInputText, Error } from './styles';

interface IProps extends TextInputMaskProps {
    control: Control;
    name: string;
    error: string;
}

export function MaskInputForm({ control, name, error, ...rest }: IProps) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <MaskInputText
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        isError={error}
                        {...rest}
                    />
                )}
                name={name}
                {...rest}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}
