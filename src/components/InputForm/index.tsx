import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Container, Input, Error } from './styles';

// type Props = TextInputProps & UseControllerProps<any>;
interface IProps extends TextInputProps {
    control: Control;
    name: string;
    error: string;
}

export function InputForm({ control, name, error, ...rest }: IProps) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        isError={error}
                        {...rest}
                    />
                )}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}
