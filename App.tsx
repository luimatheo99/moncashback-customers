import {
    useFonts,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components';

import { StatusBarComponent } from './src/components/StatusBar';
import { AppProvider } from './src/hooks';
import { Routes } from './src/routes';
import theme from './src/styles/theme';

export default function App() {
    const [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_500Medium,
        Archivo_600SemiBold,
    });

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        await AsyncStorage.setItem('DEVICE', token);
    }

    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ThemeProvider theme={theme}>
            <AppProvider>
                <StatusBarComponent />
                <Routes />
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </AppProvider>
        </ThemeProvider>
    );
}
