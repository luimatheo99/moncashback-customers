import { Ionicons, Feather } from '@expo/vector-icons';
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ICompanyDTO } from '../../dtos/ICompanyDTO';
import {
    Container,
    Logo,
    Details,
    Category,
    Name,
    AddressView,
    Address,
    PhotoContainer,
} from './style';

interface IProps extends RectButtonProps {
    data: ICompanyDTO;
}

export function Company({ data, ...rest }: IProps) {
    return (
        <Container {...rest}>
            <PhotoContainer>
                <Logo source={{ uri: data?.logo }} resizeMode="contain" />
            </PhotoContainer>
            <Details>
                <Category>
                    <Ionicons name={data.category.icon} size={10} />
                    {` ${data.category.name}`}
                </Category>
                <Name numberOfLines={1}>{data.name}</Name>
                <AddressView>
                    <Address>
                        {data.city.name} - {data.state.uf}
                    </Address>
                </AddressView>
            </Details>
            <Feather name="chevron-right" size={18} />
        </Container>
    );
}
