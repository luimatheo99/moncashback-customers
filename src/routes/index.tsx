import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '../hooks/auth';
import { api } from '../services/api';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { user, signOut } = useAuth();

    api.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                signOut(user.id);
            }
        },
    );

    return (
        <NavigationContainer>
            {user.id ? <AppTabRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
