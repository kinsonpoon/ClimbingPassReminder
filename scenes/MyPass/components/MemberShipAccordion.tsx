import React, {useState} from "react";
import {Button, ListItem} from "react-native-elements";
import {styles} from "../../../styles";
import {ExtendMemberShipPopUp} from "./overlay/ExtendMembershipPopUp";

interface MemberShipAccordionProps extends MemberShipType {
    setLoading: (loading: boolean) => void
    gymName: string
}

export const MemberShipAccordion = (props: MemberShipAccordionProps) => {
    const [expanded, setExpanded] = useState(true)
    const [isExtendClicked, setIsExtendClicked] = useState(false)
    return (
        <ListItem.Accordion
            content={
                <ListItem.Content>
                    <ListItem.Title>MemberShip</ListItem.Title>
                </ListItem.Content>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded)
            }}
            bottomDivider
            style={styles.subAccordion}>

            <ListItem key={0} bottomDivider style={styles.subAccordion}>
                <ListItem.Content>
                    <ListItem.Title>Ends: {props.endDate}
                        <Button buttonStyle={styles.extendButton} title='Extend'
                                onPress={() => {
                                    setIsExtendClicked(true)
                                }}/></ListItem.Title>
                    <ListItem.Subtitle>Free Guest: {props.freeGuest}</ListItem.Subtitle>
                    {isExtendClicked &&
                    <ExtendMemberShipPopUp setLoading={props.setLoading}
                                           toggleOverlay={setIsExtendClicked}
                                           lastEndDate={props.endDate}
                                           gymName={props.gymName}/>}
                </ListItem.Content>
            </ListItem>

        </ListItem.Accordion>
    )
}