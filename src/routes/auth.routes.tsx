import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ForgotPassword } from '../screens/RedefinePassword/ForgotPassword';
import { ResetPassword } from '../screens/RedefinePassword/ResetPassword';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Splash"
        >
            <Screen name="Splash" component={Splash} />
            <Screen
                name="SignIn"
                component={SignIn}
                options={{ gestureEnabled: false }}
            />
            <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
            <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
            <Screen name="ForgotPassword" component={ForgotPassword} />
            <Screen name="ResetPassword" component={ResetPassword} />
        </Navigator>
    );
}
