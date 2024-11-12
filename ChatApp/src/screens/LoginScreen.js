//src/SignupScreeeen
import React from 'react';
import LoginForm from '../components/organisms/loginForm/index';

const LoginScreen = (props) => {
    return (
        <LoginForm navigation={props.navigation} />
    );
};

export default LoginScreen;