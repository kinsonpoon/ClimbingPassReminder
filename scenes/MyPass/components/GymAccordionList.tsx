import React from "react";
import {fakeData} from "../../../FakeData/FakeData";
import {GymAccordionItem} from "./GymAccordionItem";

export const GymAccordionList = () =>{
    return (
        <>
            {fakeData.map((gym: any, i) => (
                <GymAccordionItem name={gym.name} memberShip={gym.memberShip} sharePass={gym.sharePass} personalPass={gym.personalPass}/>
            ))
            }
        </>)
}