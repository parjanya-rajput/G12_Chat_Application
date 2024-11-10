import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ForgetPasswordForm from '../components/organisms/forgetPassword/index'
const ForgetPassword = (props) => {
    return (
        <>
            <ForgetPasswordForm navigation={props.navigation}/>
        </>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({})