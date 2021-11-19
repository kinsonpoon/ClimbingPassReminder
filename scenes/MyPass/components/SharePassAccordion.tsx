import React, {useState} from "react";
import {Button, Icon, ListItem} from "react-native-elements";
import {styles} from "../../../styles";

interface sharePassAccordionProps {
    passes: SharePassType[],
    name: string,
}

export const SharePassAccordion = (props: sharePassAccordionProps) => {
    const [expanded, setExpanded] = useState(true)
    return (
        <ListItem.Accordion
            content={
                <>
                    <ListItem.Content>
                        <ListItem.Title>{props.name}
                            <Button title='ADD' buttonStyle={styles.extendButton}
                                /></ListItem.Title>
                    </ListItem.Content>
                </>
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
                        <ListItem.Subtitle style={styles.passCountText}>Count: {sharePass.count} <Button
                            buttonStyle={styles.minusButton} type='clear'
                            icon={<Icon name='minus-square' size={30} color='black'
                                        type='font-awesome'/>}/></ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))

            }
        </ListItem.Accordion>
    )
}