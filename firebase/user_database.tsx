import React from "react";

import {getDatabase, ref, set, update, query} from 'firebase/database'
import {getAllPasses} from "../localStorage/passStorage";
import firebase from "firebase/compat";

export const writeUserData = async(userId, name, email) =>{
    const db = getDatabase()
    return await set(ref(db,'user/'+ userId),{
        username: name,
        email: email,
        gyms: [],
        fds: [],
        fdRequest: []
    }).then( (res) =>{
        return 'Success'
    }).catch( (error) =>{
        return error.message
    })
}

export const updateUserName = async(userId, name) =>{
    return await searchUsers(name, 'username').then(res =>{
        if(res!=null && res != 'No user find'){
            return 'This username is already been used'
        }
        else{
            const db = getDatabase()
        return update(ref(db,'user/'+ userId+'/'),{
            username: name,
        }).then( (res) =>{
            return 'Success'
        }).catch( (error) =>{
            return error.message
        }
        )}
    }).catch( err =>{
        return err.message
    })

}

export const writeUploadPasses = async(userId) =>{
    const db = getDatabase()
    const allPasses = await getAllPasses()
    return await update(ref(db,'user/'+ userId +'/'),{
        gyms: allPasses
    }).then( (res) =>{
        return 'Success'
    }).catch( (error) =>{
        return error.message
    })
}

export const searchUsers = async (keyWord: string, type: 'email'| 'username')=> {

    return await firebase.database().ref('user').orderByChild(type).equalTo(keyWord).limitToFirst(1).once('value').
    then((snapshot)=>{
        let username = ''
        let email = ''
        let uid: any = ''
        snapshot.forEach( e=>{
            username = e.child('username').val()
            email = e.child('email').val()
            uid = e.key
        })
        if(email==''){
            return 'No user find'
        }
        else{
            return ({username: username, email: email, uid: uid})
        }
    })
        .catch( err =>{
            console.log(err)
            return null
        })

}