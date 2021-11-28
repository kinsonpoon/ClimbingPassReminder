import React from "react";

import {getDatabase, ref, set, update, query} from 'firebase/database'
import firebase from "firebase/compat";
import {storeAllFriendRequest, storeFds} from "../localStorage/friendStorage";

export const addFd = async (user, targetUser) => {
    const db = getDatabase()
    await set(ref(db, 'relationship/' + targetUser.uid + '/' + user.uid), {
        from: user.email,
        target: targetUser.email,
        username: user.username,
        status: 0
    }).then((res) => {
        return 'Success'
    }).catch((error) => {
        return error.message
    })

}

const confirmFriendSide = async (user, request) => {
    const db = getDatabase()
    return await set(ref(db, 'relationship/' + request.fromUid + '/' + user.uid), {
        from: user.email,
        target: request.from,
        username: user.username,
        status: 1
    }).then((res) => {
        return 'Success'
    }).catch((error) => {
        return error.message
    })
}

const confirmMySide = async (user, request) =>{
    const db = getDatabase()
    return await set(ref(db, 'relationship/' + user.uid + '/' + request.fromUid), {
        from: request.from,
        target: user.email,
        username: request.username,
        status: 1
    }).then((res) => {
        return 'Success'
    }).catch((error) => {
        return error.message
    })
}

export const confirmFdToFireBase = async (user, request) => {
    const [result2, result3] = await Promise.all([confirmFriendSide(user,request), confirmMySide(user, request)])
    return result2
}

export const rejectRequest = async (user, requestUser) => {
    const db = getDatabase()
    return await set(ref(db, 'user/' + user.uid + '/' + requestUser.uid), null).then((res) => {
        return 'Success'
    }).catch((error) => {
        return error.message
    })
}

export const findAllMyFd = async (user) => {
    return await firebase.database().ref('relationship/' + user.uid).orderByChild('status').equalTo(1).once('value').then((snapshot) => {
        const records: any = []
        snapshot.forEach(e => {
            const targetEmail = e.child('target').val()
            const from = e.child('from').val()
            const status = e.child('status').val()
            records.push({targetEmail:targetEmail, status:status, from: from})
        })
        storeFds(records)
        return 'findAllMyFd(props.user)'
    }).catch(err => {
        return err.message
    })
}

export const findAllMyRequest = async (user) => {
    return await firebase.database().ref('relationship/' + user.uid).orderByChild('status').equalTo(0).once('value').then((snapshot) => {
        const records: any = []
        snapshot.forEach(e => {
            const uid = e.key
            const targetEmail = e.child('target').val()
            const from = e.child('from').val()
            const username = e.child('username').val()
            const status = e.child('status').val()
            records.push({username:username, targetEmail:targetEmail, status:status, from: from, fromUid: uid})
        })
        storeAllFriendRequest(records)
        return 'findAllMyRequest(props.user)'
    }).catch(err => {
            return err.message
        })
}