import AsyncStorage from '@react-native-async-storage/async-storage';
import {fakeData, newEmptyGym, newEmptyPass, newMemberShip} from "../FakeData/FakeData";

export const storeAllPasses = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@allPasses', jsonValue)
    } catch (e) {
        alert(e)
    }
}

export const getAllPasses = async () => {
    try {
        let jsonValue = await AsyncStorage.getItem('@allPasses')
        if (jsonValue == null) {
            await storeAllPasses(fakeData)
            jsonValue = await AsyncStorage.getItem('@allPasses')
            return JSON.parse(jsonValue!)
        }
        return JSON.parse(jsonValue)
    } catch (e) {
    }
}

export const addNewGym = async (name: string) => {
    try {
        let jsonValue = await AsyncStorage.getItem('@allPasses')
        if (jsonValue != null) {
            let gyms = JSON.parse(jsonValue)
            if( gyms.length>=1 && gyms.filter(gym => gym.name==name).length>=1){
                alert(name + ' already set up')
            }
            else{
                const newGym = newEmptyGym(name)
                gyms.push(newGym)
                await storeAllPasses(gyms)


            }
        }
    } catch (e) {
        alert(e)
    }
}

export const minusSharePass = async(gymName: string, targetPassOption: string, targetPass: SharePassType, count: number) =>{
    try {
        let jsonValue = await AsyncStorage.getItem('@allPasses')
        if (jsonValue != null) {
            let gyms = JSON.parse(jsonValue)
            const gymIndex = gyms.findIndex((gym => gym.name == gymName));
            const passIndex = gyms[gymIndex][targetPassOption].findIndex((passes => passes== targetPass));
            gyms[gymIndex][targetPassOption][passIndex].count = gyms[gymIndex][targetPassOption][passIndex].count-count
            if(gyms[gymIndex][targetPassOption][passIndex].count<=0){
                gyms[gymIndex][targetPassOption].splice(passIndex,1)
            }
            await storeAllPasses(gyms)
        }
    } catch (e) {
        alert(e)
    }
}

export const addSharePass = async(gymName:string, targetPassOption: string, startDate: string, endDate: string, count: number) =>{
    try {
        let jsonValue = await AsyncStorage.getItem('@allPasses')
        if (jsonValue != null) {
            let gyms = JSON.parse(jsonValue)
            const gymIndex = gyms.findIndex((gym => gym.name == gymName))
            gyms[gymIndex][targetPassOption].push(newEmptyPass(startDate, endDate, count))
            await storeAllPasses(gyms)
        }
    } catch (e) {
        alert(e)
    }
}

export const extendMemberShip = async(gymName:string, startDate: string, endDate: string, freeGuest: number) =>{
    try {
        let jsonValue = await AsyncStorage.getItem('@allPasses')
        if (jsonValue != null) {
            let gyms = JSON.parse(jsonValue)
            const gymIndex = gyms.findIndex((gym => gym.name == gymName))
            gyms[gymIndex].memberShip = newMemberShip(startDate,endDate,freeGuest)
            await storeAllPasses(gyms)
        }
    } catch (e) {
        alert(e)
    }
}