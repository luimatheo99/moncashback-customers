import React from 'react';
import { StatusBar, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useAuth } from '../../hooks/auth';
import theme from '../../styles/theme';

export function StatusBarComponent() {
    const { customer } = useAuth();

    return (
        <>
            {customer && customer.id ? (
                <View
                    style={{
                        backgroundColor: theme.colors.main,
                        height: getStatusBarHeight(true),
                    }}
                >
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={theme.colors.main}
                        translucent
                    />
                </View>
            ) : (
                <View
                    style={{
                        backgroundColor: theme.colors.background_primary,
                        height: getStatusBarHeight(true),
                    }}
                >
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={theme.colors.background_primary}
                        translucent
                    />
                </View>
            )}
        </>
    );
}
