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
    count: number
}
