type MyGym = {
    gyms: GymType[]
}


type GymType = {
    name: string,
    memberShip: MemberShipType,
    sharePass: SharePassType[],
    personalPass: SharePassType[]
}

type MemberShipType = {
    startDate: string,
    endDate: string,
    freeGuest: number
}

type SharePassType = {
    startDate: string,
    endDate: string,
    count: number,
}

type PersonalPassType = {
    startDate: string,
    endDate: string,
    count: number,
}

enum SharePassOptions {
    Share,
    Personal
}
