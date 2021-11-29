import React, {useState} from "react";
import {styles} from "../../../../styles";
import {Button, Input, Overlay, Text} from "react-native-elements";
import {login} from "../../../../firebase/firebaseUserFunction";
import {View} from "react-native";

interface loginOverlayProps {
    toggleOverlay: (visible: boolean) => void
}

export const LoginOverlay = (props: loginOverlayProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(true)
    const [errorPw, setErrorPw] = useState(true)
    const [errMessage, setErrMessage] = useState('')
    const [errMessagePw, setErrMessagePw] = useState('')
    const [fireBaseRes, setFireBaseRes] = useState('')
    const close = () => {
        props.toggleOverlay(false)
    }

    const submitLogin = async () => {
        const response = await login(email, password)
        if (response !== 'Success') {
            setFireBaseRes(response)
        }
        else{
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
    function checkPassword(input){
        setPassword(input)
        if(input.length<8){
            setErrorPw(true)
            setErrMessagePw('Password length need to be > =8')
        }
        else{
            setErrMessagePw('')
            setErrorPw(false)
        }
    }

    return (
        <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
            <View>
                <Text style={styles.overlayTitle}>Login</Text>
                <Input
                    label='Email'
                    placeholder='email...'
                    value={email}
                    onChangeText={checkEmail}
                />
                <Input
                    label='Password'
                    placeholder='password...'
                    value={password}
                    onChangeText={checkPassword}
                />
                <Text>{errMessage}</Text>
                <Text>{errMessagePw}</Text>
                <Text>{fireBaseRes}</Text>
            </View>
            <Button title="Confirm" disabled={error || errorPw} onPress={() => submitLogin()}/>
        </Overlay>
    )
}