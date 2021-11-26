export const newEmptyGym = (name: string) => {
    return({
    name: name,
    memberShip:{
        startDate: '2020/01/01',
        endDate: '2020/01/04',
        freeGuest: 0
    },
    sharePass: [],
    personalPass: []})
}

export const newEmptyPass = (startDate: string, endDate:string, count: number) =>{
    return ({
        startDate: startDate,
        endDate: endDate,
        count: count
    })
}

export const newMemberShip = (startDate: string, endDate: string, freeGuest: number) =>{
    return({
        startDate: startDate,
        endDate: endDate,
        freeGuest: freeGuest
    })
}

export const fakeData = [
    {
        name: 'Campus Climbing Gym',
        memberShip:{
            startDate: '01/01/2020',
            endDate: '01/01/2020',
            freeGuest: 0
        },
        sharePass: [{
            startDate: '01/01/2020',
            endDate: '01/01/2020',
            count: 5
        }],
        personalPass: [{
            startDate: '01/01/2020',
            endDate: '01/01/2020',
            count: 5
        }]
    },
    {
        name: 'Project Climbing Gym',
        memberShip:{
            startDate: '01/01/2020',
            endDate: '01/01/2020',
            freeGuest: 0
        },
        sharePass: [{
            startDate: '01/01/2020',
            endDate: '01/01/2020',
            count: 5
        }],
        personalPass: [{
            startDate: '2020/01/01',
            endDate: '2020/01/04',
            count: 5
        }]
    }]