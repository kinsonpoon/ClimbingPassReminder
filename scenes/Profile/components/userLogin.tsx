import React, {useState} from "react";
import {View} from "react-native";
import {Button} from "react-native-elements";
import {styles} from "../../../styles";
import {SignUpOverlay} from "./overlay/signUpOverlay";
import {LoginOverlay} from "./overlay/loginOverlay";
import {ForgetPasswordOverlay} from "./overlay/forgetPasswordOverlay";

interface LoginProps{
    reloadStorage: () => void
    userLocal: any
}

export const LoginScreen = (props: LoginProps) =>{
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLoginClicked, setIsLoginClicked] = useState(false)
    const [isForgetPWClicked, setIsForgetPWClicked] = useState(false)
    return (
        <View>
            <Button buttonStyle={styles.marginVer} title='Sign up' onPress={() =>{setIsSignUpClicked(!isSignUpClicked)}}/>
            {isSignUpClicked && <SignUpOverlay toggleOverlay={setIsSignUpClicked} reloadStorage={props.reloadStorage}/>}
            <Button buttonStyle={styles.marginVer} title='Login' onPress={() =>{setIsLoginClicked(!isLoginClicked)}}/>
            {isLoginClicked && <LoginOverlay userLocal={props.userLocal} toggleOverlay={setIsLoginClicked}/>}
            <Button buttonStyle={styles.marginVer} title='Forget Password' onPress={() =>{setIsForgetPWClicked(!isForgetPWClicked)}}/>
            {isForgetPWClicked && <ForgetPasswordOverlay toggleOverlay={setIsForgetPWClicked}/>}
        </View>
    )
}