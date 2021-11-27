import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeFds = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@fds', jsonValue)
    } catch (e) {
        alert(e)
    }
}

export const getAllFds = async() =>{
    try {
        let jsonValue = await AsyncStorage.getItem('@fds')
        if (jsonValue == null) {
            return []
        }
        return JSON.parse(jsonValue)
    } catch (e) {
        return []
    }
}

export const storeAllFriendRequest = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@requests', jsonValue)
    } catch (e) {
        alert(e)
    }
}

export const getAllFriendRequest = async() =>{
    try {
        let jsonValue = await AsyncStorage.getItem('@requests')
        if (jsonValue == null) {
            return []
        }
        const allRelationShip = JSON.parse(jsonValue)
        return allRelationShip.filter(relationship => relationship.status==0)
    } catch (e) {
        return []
    }
}

export const isThisAddable = async (user, targetEmail)=>{
    if(user.email==targetEmail){
        return 'You cannot add urself'
    }
    const allFd = await getAllFds()
    const allFdRequest = await getAllFriendRequest()
    if(allFd.filter( fd => fd.from == targetEmail).length>0){
        return 'You two are already fds'
    }
    else if(allFdRequest.filter( fd => fd.from == targetEmail).length>0){
        return 'U have request from he/she already'
    }
    else{
        return null
    }

}