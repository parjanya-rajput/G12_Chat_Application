import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigation from './AuthStackNavigation';
import HomeStackNavigation from './HomeStackNavigation';

//Firebase checks
import { onAuthStateChange } from '../firebase/authService';

const RootNavigation = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Call the monitorAuthState function and pass in a callback to handle the user state
        const unsubscribe = onAuthStateChange((user) => {
            if (user) {
                setUser(user); // User is logged in and email is verified
            } else {
                setUser(null); // No user or email not verified
            }
            setLoading(false); // Done checking auth state
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        // Show a loading indicator while Firebase is checking the auth state
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            {user ? <HomeStackNavigation /> : <AuthStackNavigation />}
        </NavigationContainer>
    );
};

export default RootNavigation;