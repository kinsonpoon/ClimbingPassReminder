import React from "react";

import {getDatabase, ref, set, update} from 'firebase/database'
import {getAllPasses} from "../localStorage/passStorage";

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
    const db = getDatabase()
    return await update(ref(db,'user/'+ userId),{
        username: name,
    }).then( (res) =>{
        return 'Success'
    }).catch( (error) =>{
        return error.message
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