import React, {useState} from "react";
import {Avatar, ListItem, Overlay, CheckBox, Text, Button, Icon} from "react-native-elements";
import {ScrollView, View} from "react-native";
import {styles} from "../../../../styles";

interface FriendRequestOverlayProps{
    reloadParent: () => void
    toggleOverlay: (visible: boolean) => void
    data: any[]
}

export const FriendRequestOverlay = (props: FriendRequestOverlayProps) =>{
    const close = () =>{
        props.toggleOverlay(false)
    }
    const [checkedList, setCheckedList]: any= useState([])
    const [update, setUpdated] = useState(0)
    const onChangeCheckBox = (targetEmail) =>{
        const temp = checkedList
        const index = checkedList.indexOf(targetEmail)
        console.log(index)
        if( index>-1){
            temp.splice(index,1)
        }
        else{
            temp.push(targetEmail)
        }
        setCheckedList(temp)
        setUpdated(update+1)
    }
    function checkIsChecked(email){
        if(checkedList.includes(email)){
            return true
        }
        return false
    }

    console.log(props.data)
    return (
        <View>
            <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
                <ScrollView>
                    {(props.data.length>0)? props.data.map((fdRequest: any, i)=>(
                        <ListItem bottomDivider key={i}
                                  onPress={()=>{onChangeCheckBox(fdRequest.from)}}>
                            {checkIsChecked(fdRequest.from) && <Icon name={'check'} />}
                            <ListItem.Content>
                                <ListItem.Title>{fdRequest.username}
                                    </ListItem.Title>
                                <ListItem.Subtitle>{fdRequest.from}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )):<View>No new request</View>}
                    <Button buttonStyle={styles.marginVer} title={'confirm'}/>
                </ScrollView>
            </Overlay>
        </View>
    )
}