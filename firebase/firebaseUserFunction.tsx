import React from "react";
import firebase from "firebase/compat";
import {updateUserName, writeUserData} from "./user_database";

export const signUp = async (email: string, password: string) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user
        user?.sendEmailVerification()
        writeUserData(user?.uid, user?.displayName, user?.email)
        return 'Success'
    })
        .catch((error) => {
            return error.message
        })
}

export const login = async (email: string, password: string) =>{
    return firebase.auth().signInWithEmailAndPassword(email,password).then((userCredential) => {
        const user = userCredential.user
        writeUserData(user?.uid, user?.displayName, user?.email)
        return 'Success'
    })
        .catch((error) => {
            return error.message
        })
}

export const forgetPassword = async (email: string) =>{
    return firebase.auth().sendPasswordResetEmail(email).then((res)=>{
        return 'Success'
    }).catch((error)=>{
        return error
    })
}

export const logOut = async() =>{
    return firebase.auth().signOut().then((res)=>{
        return 'Success'
    }).catch((error)=>{
        return error
    })
}


export const updateDisplayName = async (user, displayName: string) =>{
    return user.updateProfile({displayName: displayName}).then((res) =>{
        updateUserName(user?.uid, displayName)
        return 'Success'
    }).catch((error)=>{
        return error
    })
}