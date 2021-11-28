import React from "react";

import {getDatabase, ref, get, update, query} from 'firebase/database'
import {getAllPasses} from "../localStorage/passStorage";
import {getAllFds, storeFdsPass} from "../localStorage/friendStorage";

export const getAllSharePassFromOthers = async () => {
    const db = getDatabase()
    const localGymList = await getAllPasses()
    const localFriendList = await getAllFds()
    const gymList = localGymList.map(function (obj) {
        return obj.name
    })
    const friendUidList = localFriendList.map(function (obj) {
        return obj.uid
    })
    const localSharePassList: any = []
    await Promise.all(gymList.map(async gym => {
        const sub: any = {name: gym, list: []}
        await Promise.all(localFriendList.map(async fd =>{
            await get(ref(db, 'sharepass/' + gym + '/' + fd.uid)).then(res => {
                console.log('gym')
                if (res != null) {
                    console.log('ser')
                    res.forEach(e => {
                        console.log(e)
                        const endDate = e.child('endDate').val()
                        const count = e.child('count').val()
                        const user = fd.from
                        console.log(endDate, count, user)
                        sub.list.push({
                            endDate: endDate, count: count, user: user
                        })
                    })
                }
            })
        }))
        if(sub.list.length>0){
            localSharePassList.push(sub)
        }
    }))
    await storeFdsPass(localSharePassList)
}