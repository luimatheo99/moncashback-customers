import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'styled-components';

import { Companies } from '../screens/Companies';
import { Home } from '../screens/Home';
import { IndicateCompany } from '../screens/IndicateCompany';
import { Profile } from '../screens/Profile';
import { AppDrawerRoutes } from './app.drawer.routes';
import { AppStackRoutes } from './app.stack.routes';

const Tab = createBottomTabNavigator();

export function AppTabRoutes() {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_detail,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.background_primary,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={AppDrawerRoutes}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={25} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Companies"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="isv" size={25} color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="IndicateCompany"
                component={IndicateCompany}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="gift-outline" size={25} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="person-outline"
                            size={25}
                            color={color}
                        />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
}
