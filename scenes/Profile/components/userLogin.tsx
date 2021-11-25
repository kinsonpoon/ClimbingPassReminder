import React, {useState} from "react";
import {View} from "react-native";
import {Button, Input} from "react-native-elements";
import {signUp} from "../../../firebase/firebaseUserFunction";
import {styles} from "../../../styles";
import {SignUpOverlay} from "./overlay/signUpOverlay";
import {LoginOverlay} from "./overlay/loginOverlay";
import {ForgetPasswordOverlay} from "./overlay/forgetPasswordOverlay";

export const LoginScreen = () =>{
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLoginClicked, setIsLoginClicked] = useState(false)
    const [isForgetPWClicked, setIsForgetPWClicked] = useState(false)
    return (
        <View>
            <Button style={styles.marginVer} title='Sign up' onPress={() =>{setIsSignUpClicked(!isSignUpClicked)}}/>
            {isSignUpClicked && <SignUpOverlay toggleOverlay={setIsSignUpClicked}/>}
            <Button style={styles.marginVer} title='Login' onPress={() =>{setIsLoginClicked(!isLoginClicked)}}/>
            {isLoginClicked && <LoginOverlay toggleOverlay={setIsLoginClicked}/>}
            <Button style={styles.marginVer} title='Forget Password' onPress={() =>{setIsForgetPWClicked(!isForgetPWClicked)}}/>
            {isForgetPWClicked && <ForgetPasswordOverlay toggleOverlay={setIsForgetPWClicked}/>}
        </View>
    )
}