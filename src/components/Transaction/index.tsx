import { Ionicons } from '@expo/vector-icons';
import { parseISO, format } from 'date-fns';
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { IMovimentationDTO } from '../../dtos/IMovimentationDTO';
import {
    Container,
    Logo,
    Details,
    Category,
    Name,
    CreatedView,
    Created,
    PhotoContainer,
    Amount,
} from './style';

interface IProps extends RectButtonProps {
    data: IMovimentationDTO;
}

export function Transaction({ data, ...rest }: IProps) {
    return (
        <Container {...rest}>
            <PhotoContainer>
                <Logo
                    source={{ uri: data?.company.logo }}
                    resizeMode="contain"
                />
            </PhotoContainer>
            <Details>
                <Category>
                    <Ionicons name={data.company.category.icon} size={10} />
                    {` ${data.company.category.name}`}
                </Category>
                <Name numberOfLines={1}>{data.company.name}</Name>
                <CreatedView>
                    <Created>
                        {format(parseISO(data.created_at), 'dd/MM/yyyy HH:mm')}
                    </Created>
                </CreatedView>
            </Details>
            <Amount type={data.type}>
                {data.type === 'W'
                    ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                      }).format(Number(data.earned_value))
                    : `- ${new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                      }).format(Number(data.pay_value))}`}
            </Amount>
        </Container>
    );
}
