import React, {useEffect, useState} from "react";
import {useAuth} from "../../auth/AuthenticatedUserProvider";
import {Text} from "react-native";
import Profile from "./main/view";
import {LoginScreen} from "./components/userLogin";
import {getAllFds, getAllFriendRequest} from "../../localStorage/friendStorage";
import {getUserLocal} from "../../localStorage/passStorage";
import {getAllSharePassFromOthers} from "../../firebase/findSharePass_database";

export const ProfileScreen = () =>{
    const {initializing, user} = useAuth()
    const [loading, setLoading] = useState(false)
    const [userLocal, setUserLocal]: any = useState(undefined)
    const [relationship, setRelationship]: any = useState([])
    const [requests, setRequest]: any = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const reloadFromChild = () =>{
        setRefreshKey(refreshKey+1)
    }

    useEffect( () => {
        async function fetchAsyncStorage(){
            console.log('reload')
            setLoading(true)
            const allFds = await getAllFds();
            setRelationship(allFds)
            const allRequests = await getAllFriendRequest();
            setRequest(allRequests)
            const userLocalData = await getUserLocal();
            setUserLocal(userLocalData)
        }
        fetchAsyncStorage().
        then(res => {setLoading(false)}).
        catch(err =>{setLoading(false)});
    },[refreshKey])

    if(initializing){
        return (<Text>Loading</Text>)
    }

    if(loading){
        return (<Text>Loading</Text>)
    }

    if(!user){
        return <LoginScreen reloadStorage={reloadFromChild}/>
    }

    return( <Profile
        user={user}
        userLocal={userLocal}
        reloadStorage={reloadFromChild}
        fds={relationship}
        fdRequest={requests}/>)
}