import React, {useState} from "react";
import {ListItem} from "react-native-elements";
import {SharePassAccordion} from "./SharePassAccordion";
import {MemberShipAccordion} from "./MemberShipAccordion";

export const GymAccordionItem = (props: GymType) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <ListItem.Accordion
            content={
                <>
                    <ListItem.Content>
                        <ListItem.Title>{props.name}</ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded)
            }}
            bottomDivider>
            {
                <>
                    <MemberShipAccordion
                        startDate={props.memberShip.startDate}
                        endDate={props.memberShip.endDate}
                        freeGuest={props.memberShip.freeGuest}
                    />
                    <SharePassAccordion
                        passes={props.sharePass}
                        name='Share Pass'
                    />
                    <SharePassAccordion
                        passes={props.sharePass}
                        name='Personal Pass'
                    />
                </>


            }
        </ListItem.Accordion>
    )
}