import React from "react";
import {GymAccordionItem} from "./GymAccordionItem";
import {View} from "react-native";

interface GymAccordionListProps{
    gyms: MyGym[],
    allFdPasses: any
    setLoading: () => void
}

export const GymAccordionList = (props: GymAccordionListProps) =>{
    return (
        <View>
            {(props.gyms.length>0)? props.gyms.map((gym: any, i) => (
                <GymAccordionItem key={i} name={gym.name}
                                  fdPasses={props.allFdPasses.filter(pp => pp.name==gym.name)}
                                  memberShip={gym.memberShip} sharePass={gym.sharePass}
                                  personalPass={gym.personalPass} setLoading={props.setLoading}/>
            )):<View>Add New Gym</View>
            }
        </View>)
}