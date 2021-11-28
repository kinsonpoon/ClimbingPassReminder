import React, {useState} from "react";
import {styles} from "../../../../styles";
import {Button, Input, Overlay, Text} from "react-native-elements";
import {signUp} from "../../../../firebase/firebaseUserFunction";
import {TextInput, View} from "react-native";

interface SignUpOverlayProps {
    toggleOverlay: (visible: boolean) => void
}

export const SignUpOverlay = (props: SignUpOverlayProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState(true)
    const [errorPw, setErrorPw] = useState(true)
    const [errorUsername, setErrorUsername] = useState(true)
    const [errMessage, setErrMessage] = useState('')
    const [errMessagePw, setErrMessagePw] = useState('')
    const [fireBaseRes, setFireBaseRes] = useState('')
    const close = () => {
        props.toggleOverlay(false)
    }

    const submitSignUp = async () => {
        const response = await signUp(email, password, username)
        if (response !== 'success') {
            setFireBaseRes(response)
        }
        else{
            setFireBaseRes('Please check ur email')
        }
    }
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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

    const validateUsername = (username) => {
        return username.match(
            /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
        );
    };

    function onChangeUserName(input){
        input = input.replace(' ','_')
        setUsername(input)
        if (input.length < 3 || !validateUsername(input)) {
            setErrorUsername(true)
        }
        else{
            setErrorUsername(false)
        }
    }

    return (
        <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
            <View>
                <Text style={styles.overlayTitle}>Sign Up</Text>
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
                <Text style={styles.textInputTitle}>UserName(Recommended: ur ig username)</Text>
                <TextInput
                    style={styles.textInputContainer}
                    placeholder='...'
                    value={username}
                    autoCapitalize={"none"}
                    onChangeText={onChangeUserName}/>
                <Text>{errMessage}</Text>
                <Text>{errMessagePw}</Text>
                { errorUsername &&
                <Text>Username not match instagram rules</Text>}
                <Text>{fireBaseRes}</Text>
            </View>
            <Button title="Confirm" disabled={error || errorPw || errorUsername} onPress={() => submitSignUp()}/>
        </Overlay>
    )
}