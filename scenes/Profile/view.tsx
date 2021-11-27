import React, {useEffect, useState} from "react";
import {useAuth} from "../../auth/AuthenticatedUserProvider";
import {Text} from "react-native";
import Profile from "./main/view";
import {LoginScreen} from "./components/userLogin";
import {getAllFds, getAllFriendRequest} from "../../localStorage/friendStorage";

export const ProfileScreen = () =>{
    const {initializing, user} = useAuth()
    const [relationship, setRelationship]: any = useState([])
    const [requests, setRequest]: any = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const reloadFromChild = () =>{
        setRefreshKey(refreshKey+1)
    }

    useEffect( () => {
        async function fetchAsyncStorage(){
            console.log('reload')
            const allFds = await getAllFds();
            setRelationship(allFds)
            const allRequests = await getAllFriendRequest();
            setRequest(allRequests)
        }
        fetchAsyncStorage();
    },[refreshKey])

    if(initializing){
        return (<Text>Loading</Text>)
    }

    if(!user){
        return <LoginScreen/>
    }

    return( <Profile
        user={user}
        reloadStorage={reloadFromChild}
        fds={relationship}
        fdRequest={requests}/>)
}