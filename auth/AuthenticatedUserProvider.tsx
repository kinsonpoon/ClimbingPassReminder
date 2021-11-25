import React, {useState, createContext, useContext, useEffect} from "react";
import firebase from "firebase/compat";

const userContext = createContext({user:null})

export const useSession = () =>{
    const {user} = useContext(userContext)
    return user
}

export const useAuth = () =>{
    const [state, setState] = useState(() =>{
        const user = firebase.auth().currentUser
        return{
            initializing: !user,
            user,
        }
    })

    function onChange(user){
        setState({initializing: false, user})
    }

    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange)

        return ()=> unsubscribe()
    },[])

    return state
}

