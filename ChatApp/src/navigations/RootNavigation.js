import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigation from './AuthStackNavigation';
import HomeDrawerNavigation from './HomeDrawerNavigation';

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <AuthStackNavigation />
        </NavigationContainer>
    );
};

export default RootNavigation;