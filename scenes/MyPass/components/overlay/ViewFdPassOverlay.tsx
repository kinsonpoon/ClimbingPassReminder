import React from 'react'
import {ListItem, Overlay, Text} from "react-native-elements";
import {styles} from "../../../../styles";
import {ScrollView} from "react-native";

interface ViewFdPassOverlayProps {
    toggleOverlay: (visible: boolean) => void
    gymName: string
    sharepasses: any
}

export const ViewFdPassOverlay = (props: ViewFdPassOverlayProps) =>{
    const close = () => {
        props.toggleOverlay(false)
    }
        console.log(props.sharepasses[0].list)

    return(
        <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
            <ScrollView>
                <Text style={styles.overlayTitle}>{props.gymName}</Text>
                {props.sharepasses[0].list.length>0 &&
                props.sharepasses[0].list.map((pass: any, i)=>(
                    <ListItem bottomDivider key={i}>
                        <ListItem.Content>
                            <ListItem.Title>{pass.user}</ListItem.Title>
                            <ListItem.Subtitle>{pass.endDate} count:{pass.count}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>))}
            </ScrollView>

        </Overlay>
    )
}