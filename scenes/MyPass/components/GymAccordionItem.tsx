import React, {useState} from "react";
import {Icon, ListItem} from "react-native-elements";
import {SharePassAccordion} from "./SharePassAccordion";
import {MemberShipAccordion} from "./MemberShipAccordion";
import {View} from "react-native";
import {PersonalPassAccordion} from "./PersonalPassAccordion";
import {ViewFdPassOverlay} from "./overlay/ViewFdPassOverlay";

interface GymAccordionItemProps extends GymType {
    setLoading: (loading: boolean) => void
    fdPasses: any
}

export const GymAccordionItem = (props: GymAccordionItemProps) => {
    const [expanded, setExpanded] = useState(false)
    const [isViewFdPasses, setIsViewFdPasses] = useState(false)
    return (
        <ListItem.Accordion
            content={
                    <ListItem.Content>
                        <ListItem.Title>{props.name} {props.fdPasses.length>0 &&
                        <Icon onPress={()=>{setIsViewFdPasses(!isViewFdPasses)}} style={{display: 'flex', alignSelf:'flex-end'}} name={'search'} type={'font-awesome'}/>}</ListItem.Title>
                        {isViewFdPasses &&<ViewFdPassOverlay toggleOverlay={setIsViewFdPasses} gymName={props.name} sharepasses={props.fdPasses}/>}
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
                    gymName={props.name}
                />
                <SharePassAccordion
                    passes={props.sharePass}
                    name='Share Pass'
                    setLoading={props.setLoading}
                    gymName={props.name}
                />
                <PersonalPassAccordion
                    passes={props.personalPass}
                    name='Personal Pass'
                    setLoading={props.setLoading}
                    gymName={props.name}
                />
            </View>

        </ListItem.Accordion>
    )
}