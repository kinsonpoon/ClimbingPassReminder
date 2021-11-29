import React, {useState} from "react";
import {styles} from "../../../../styles";
import {Button, Input, Overlay, Text} from "react-native-elements";
import {forgetPassword} from "../../../../firebase/firebaseUserFunction";
import {View} from "react-native";

interface ForgetPasswordOverlayProps {
    toggleOverlay: (visible: boolean) => void
}

export const ForgetPasswordOverlay = (props: ForgetPasswordOverlayProps) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(true)
    const [errMessage, setErrMessage] = useState('')
    const [fireBaseRes, setFireBaseRes] = useState('')
    const close = () => {
        props.toggleOverlay(false)
    }

    const submitForgetPW = async () => {
        const response = await forgetPassword(email)
        if (response !== 'success') {
            setFireBaseRes(response)
        } else {
            setFireBaseRes('Please check ur email')
        }
    }
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function checkEmail(input) {
        setEmail(input)
        if (input.length < 1 || !validateEmail(input)) {
            setError(true)
            setErrMessage('EmailFormat not correct')
        } else {
            setError(false)
            setErrMessage('')
        }
    }


    return (
        <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
            <View>
                <Text style={styles.overlayTitle}>Reset Password</Text>
                <Input
                    label='Email'
                    placeholder='email...'
                    value={email}
                    onChangeText={checkEmail}
                />
                <Text>{errMessage}</Text>
                {fireBaseRes &&
                <Text>Request {fireBaseRes}, please check ur email</Text>
                }
            </View>
            <Button title="Confirm" disabled={error} onPress={() => submitForgetPW()}/>
        </Overlay>
    )
}