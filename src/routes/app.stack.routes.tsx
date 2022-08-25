import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Companies } from '../screens/Companies';
import { CompanyDetails } from '../screens/CompanyDetails';

const Stack = createStackNavigator();

export function AppStackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CompaniesStack" component={Companies} />
            <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
        </Stack.Navigator>
    );
}
