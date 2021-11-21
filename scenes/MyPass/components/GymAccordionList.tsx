import React, {useState} from "react";
import {GymAccordionItem} from "./GymAccordionItem";
import {View} from "react-native";

interface GymAccordionListProps{
    gyms: MyGym[],
    setLoading: (loading: boolean) => void
}

export const GymAccordionList = (props: GymAccordionListProps) =>{
    return (
        <View>
            {(props.gyms.length>0)? props.gyms.map((gym: any, i) => (
                <GymAccordionItem key={i} name={gym.name} memberShip={gym.memberShip} sharePass={gym.sharePass}
                                  personalPass={gym.personalPass} setLoading={props.setLoading}/>
            )):<View>Add new Pass</View>
            }
        </View>)
}