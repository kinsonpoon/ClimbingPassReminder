import React from "react";
import {useAuth} from "../../auth/AuthenticatedUserProvider";
import {Text} from "react-native";
import Profile from "./main/view";
import {LoginScreen} from "./components/userLogin";

interface ProfileScreenProps{
    loading: boolean,
    userLocal: any,
    relationship: any,
    requests: any,
    reloadFromChild: () => void
}

export const ProfileScreen = (props: ProfileScreenProps) =>{
    const {initializing, user} = useAuth()



    if(initializing){
        return (<Text>Loading</Text>)
    }

    if(props.loading){
        return (<Text>Loading</Text>)
    }

    if(!user){
        return <LoginScreen userLocal={props.userLocal} reloadStorage={props.reloadFromChild}/>
    }

    return( <Profile
        user={user}
        userLocal={props.userLocal}
        reloadStorage={props.reloadFromChild}
        fds={props.relationship}
        fdRequest={props.requests}/>)
}