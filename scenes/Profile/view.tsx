import React from "react";
import {useAuth} from "../../auth/AuthenticatedUserProvider";
import {Text} from "react-native";
import Profile from "./main/view";
import {LoginScreen} from "./components/userLogin";

export const ProfileScreen = () =>{
    const {initializing, user} = useAuth()

    if(initializing){
        return (<Text>Loading</Text>)
    }

    if(!user){
        return <LoginScreen/>
    }

    console.log(user)
    return( <Profile user={user}/>)
}