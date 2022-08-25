import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import * as React from 'react';
import { Alert } from 'react-native';

import { useAuth } from '../hooks/auth';
// import { Cars } from '../screens/Cars';
import { Home } from '../screens/Home';
import { IndicateCompany } from '../screens/IndicateCompany';
import { Password } from '../screens/Password';
import { Profile } from '../screens/Profile';
import theme from '../styles/theme';

const Drawer = createDrawerNavigator();

const handleExitApp = (onExit) =>
    Alert.alert('Atenção', 'Deseja sair do app?', [
        {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
        },
        { text: 'OK', onPress: () => onExit() },
    ]);

function CustomDrawerContent(props) {
    const { signOut } = useAuth();

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Sair"
                icon={() => (
                    <MaterialCommunityIcons
                        name="exit-to-app"
                        size={25}
                        color={theme.colors.white}
                    />
                )}
                labelStyle={{ color: 'white' }}
                onPress={() => handleExitApp(signOut)}
            />
        </DrawerContentScrollView>
    );
}

export function AppDrawerRoutes() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerActiveTintColor: theme.colors.white,
                drawerInactiveTintColor: theme.colors.white,
                drawerStyle: {
                    backgroundColor: theme.colors.main,
                },
                headerShown: false,
                drawerPosition: 'right',
                drawerType: 'front',
            }}
        >
            <Drawer.Screen
                name="HomePage"
                component={Home}
                options={{
                    drawerLabel: 'Início',
                    drawerIcon: () => (
                        <Feather
                            name="home"
                            size={25}
                            color={theme.colors.white}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="IndicateCompany"
                component={IndicateCompany}
                options={{
                    drawerLabel: 'Indicar Estabelecimentos',
                    drawerIcon: () => (
                        <Feather
                            name="gift"
                            size={25}
                            color={theme.colors.white}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                    drawerLabel: 'Alterar Perfil',
                    drawerIcon: () => (
                        <Feather
                            name="user"
                            size={25}
                            color={theme.colors.white}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Password"
                component={Password}
                options={{
                    drawerLabel: 'Alterar senha',
                    drawerIcon: () => (
                        <Feather
                            name="lock"
                            size={25}
                            color={theme.colors.white}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
