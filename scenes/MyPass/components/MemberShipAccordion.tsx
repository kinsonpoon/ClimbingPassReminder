import React, {useState} from "react";
import {Button, ListItem} from "react-native-elements";
import {styles} from "../../../styles";

export const MemberShipAccordion = (props: MemberShipType) =>{
    const [expanded, setExpanded] = useState(true)
    return(
        <ListItem.Accordion
            content={
                <>
                    <ListItem.Content>
                        <ListItem.Title>MemberShip</ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded)
            }}
            bottomDivider
        style={styles.subAccordion}>
            {
                <ListItem key={0} bottomDivider style={styles.subAccordion}>
                    <ListItem.Content>
                        <ListItem.Title>Ends: {props.endDate} <Button buttonStyle={styles.extendButton} title='Extend'/></ListItem.Title>
                        <ListItem.Subtitle>Free Guest: {props.freeGuest}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            }
        </ListItem.Accordion>
    )
}