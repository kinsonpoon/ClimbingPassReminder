import React, {useState} from "react";
import {Button, Icon, ListItem} from "react-native-elements";
import {styles} from "../../../styles";
import {View} from "react-native";
import {MinusSharePassPopUp} from "./overlay/MinusSharePassPopUp";

interface personalPassAccordionProps {
    gymName: string,
    passes: SharePassType[],
    name: string,
    setLoading: (loading: boolean) => void
}

export const PersonalPassAccordion = (props: personalPassAccordionProps) => {
    const [expanded, setExpanded] = useState(true)
    const [isUseClicked, setIsUseClicked] =useState(false)
    return (
        <ListItem.Accordion
            content={
                <View>
                    <ListItem.Content>
                        <ListItem.Title>{props.name}
                            <Button title='ADD' buttonStyle={styles.addButton}
                            /></ListItem.Title>
                    </ListItem.Content>
                </View>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded)
            }}
            style={styles.subAccordion}
            bottomDivider>
            {props.passes.map((sharePass: any, j) => (
                <ListItem key={j} bottomDivider style={styles.subAccordion}>
                    <ListItem.Content>
                        <ListItem.Title>Ends: {sharePass.endDate}</ListItem.Title>
                        <ListItem.Subtitle style={styles.passCountText}>Count: {sharePass.count}
                            <Button title='USE' buttonStyle={styles.useButton} onPress={()=>{setIsUseClicked(true)}}/></ListItem.Subtitle>
                        {isUseClicked && <MinusSharePassPopUp gymName={props.gymName} sharePassType={'personalPass'} sharePassRef={sharePass} count={sharePass.count} setLoading={props.setLoading} toggleOverlay={setIsUseClicked}/>}
                    </ListItem.Content>
                </ListItem>

            ))
            }
        </ListItem.Accordion>
    )
}