import React from "react";

import {getDatabase, ref, set, update, query} from 'firebase/database'
import firebase from "firebase/compat";
import {storeAllFriendRequest, storeFds} from "../localStorage/friendStorage";

export const addFd = async (user, targetUser) => {
    const db = getDatabase()
    await set(ref(db, 'relationship/' + targetUser.uid + '/' + user.uid), {
        from: user.email,
        target: targetUser.email,
        username: user.displayName,
        status: 0
    }).then((res) => {
        return 'Success'
    }).catch((error) => {
        return error.message
    })

}

export const confirmFd = async (ownEmail, targetEmail) => {

}

export const rejectRequest = async (ownEmail, targetEmail) => {
    const db = getDatabase()
    return await update(ref(db, 'user/' + ownEmail + '/' + targetEmail), {
        status: 2
    }).then((res) => {
        return 'Success'
    }).catch((error) => {
        return error.message
    })
}

export const findAllMyFd = async (user) => {
    return await firebase.database().ref('relationship/' + user.uid).orderByChild('status').equalTo(1).once('value').then((snapshot) => {
        const records: any = []
        snapshot.forEach(e => {
            const targetEmail = e.child('targetEmail').val()
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
            console.log(e)
            const targetEmail = e.child('target').val()
            const from = e.child('from').val()
            const username = e.child('username').val()
            const status = e.child('status').val()
            records.push({username:username, targetEmail:targetEmail, status:status, from: from})
        })
        storeAllFriendRequest(records)
        return 'findAllMyFd(props.user)'
    }).catch(err => {
            return err.message
        })
}