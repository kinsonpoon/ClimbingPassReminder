import React from "react";
import {ListItem, Overlay, Button, Icon} from "react-native-elements";
import {Alert, ScrollView, View} from "react-native";
import {styles} from "../../../../styles";
import {useState} from "react";

interface FriendListOverlayProps{
    reloadParent: () => void
    toggleOverlay: (visible: boolean) => void
    data: any[],
    userLocal: any
}

export const FriendListOverlay = (props: FriendListOverlayProps) =>{
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

    const confirmUserRequest = async() =>{
        alert('underConstruction')
    }

    const confirmDeleteButton = () =>{
        Alert.alert(
            'Confirm delete?',
            'They will be deleted after clicked yes',
            [{text:'No'},{text: 'Yes', onPress: () =>{
                    alert('underConstruction')
                }}]
        )
    }

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
                    <Button buttonStyle={styles.warning} disabled={checkedList.length<1} title={'delete'} onPress={() =>confirmDeleteButton()}/>
                </ScrollView>
            </Overlay>
        </View>
    )
}