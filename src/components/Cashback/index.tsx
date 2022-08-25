import { parseISO, format, addHours } from 'date-fns';
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { ICashbackDTO } from '../../dtos/ICashbackDTO';
import { Container, Details, Name, ExpiresView, ExpiresText } from './style';

interface IProps extends RectButtonProps {
    data: ICashbackDTO;
}

export function Cashback({ data, ...rest }: IProps) {
    return (
        <Container {...rest}>
            <Details>
                <Name numberOfLines={1}>{data.name}</Name>

                <ExpiresView>
                    <ExpiresText>
                        Expira em{' '}
                        {format(
                            addHours(parseISO(data.expires_date.toString()), 3),
                            'dd/MM/yyyy',
                        )}
                    </ExpiresText>
                </ExpiresView>
            </Details>
            <Details>
                <Name numberOfLines={1}>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(data?.percentage / 100)}
                </Name>
            </Details>
        </Container>
    );
}
