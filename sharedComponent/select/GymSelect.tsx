import React from "react";
import {Picker} from "react-native";

const gymList = [
    {
    name: 'AtticV',
    value: 'AtticV'
    },
    {
        name: 'Campus',
        value: 'Campus'
    },
    {
        name: 'Project',
        value: 'Project'
    },
    {
        name: 'Vita Beta',
        value: 'VitaBeta'
    },
    {
        name: 'Player',
        value: 'Player'
    },
    {
        name: 'Keep Climbing',
        value: 'KeepClimbing'
    },
    {
        name: 'Just Climb',
        value: 'JustClimb'
    },
    {
        name: 'Climbing Park',
        value: 'ClimbingPark'
    },
    {
        name: 'Go Nature',
        value: 'GoNature'
    },
    {
        name: 'Verm City',
        value: 'VermCity'
    },
]

interface GymSelectProps{
    searchOption: string,
    setSearchOption: (input: string) => void
}

export const GymSelect = (props: GymSelectProps) => {
    return (
        <Picker
            selectedValue={props.searchOption}
            onValueChange={props.setSearchOption}>
            {gymList.map((gym: any, i) => (
                <Picker.Item label={gym.name} value={gym.value} key={i}/>
            ))}
        </Picker>
    )
}