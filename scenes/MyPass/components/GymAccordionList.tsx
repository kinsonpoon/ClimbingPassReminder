import React, {useState} from "react";
import {GymAccordionItem} from "./GymAccordionItem";
import {getAllPasses} from "../../../localStorage/passStorage";

interface GymAccordionListProps{
    gyms: MyGym[],
    setLoading: (loading: boolean) => void
}

export const GymAccordionList = (props: GymAccordionListProps) =>{
    return (
        <>
            {props.gyms?.length>=1 && props.gyms.map((gym: any, i) => (
                <GymAccordionItem key={i} name={gym.name} memberShip={gym.memberShip} sharePass={gym.sharePass}
                                  personalPass={gym.personalPass}/>
            ))
            }
        </>)
}