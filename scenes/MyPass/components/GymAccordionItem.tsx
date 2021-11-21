import React, {useState} from "react";
import {ListItem} from "react-native-elements";
import {SharePassAccordion} from "./SharePassAccordion";
import {MemberShipAccordion} from "./MemberShipAccordion";
import {View} from "react-native";

interface GymAccordionItemProps extends GymType {
    setLoading: (loading: boolean) => void
}

export const GymAccordionItem = (props: GymAccordionItemProps) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <ListItem.Accordion
            content={
                    <ListItem.Content>
                        <ListItem.Title>{props.name}</ListItem.Title>
                    </ListItem.Content>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded)
            }}
            bottomDivider>
            <View>
                <MemberShipAccordion
                    startDate={props.memberShip.startDate}
                    endDate={props.memberShip.endDate}
                    freeGuest={props.memberShip.freeGuest}
                    setLoading={props.setLoading}
                />
                <SharePassAccordion
                    passes={props.sharePass}
                    name='Share Pass'
                    setLoading={props.setLoading}
                />
                <SharePassAccordion
                    passes={props.sharePass}
                    name='Personal Pass'
                    setLoading={props.setLoading}
                />
            </View>

        </ListItem.Accordion>
    )
}