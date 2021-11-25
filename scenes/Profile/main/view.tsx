import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Avatar, Button} from 'react-native-elements';
import {logOut} from "../../../firebase/firebaseUserFunction";
import {UpdateDisplayNameOverlay} from "../components/overlay/updateDisplayNameOverlay";

const list = [
    {
        name: 'UpdateDisplayName',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }]
interface profileProps{
    user: any
}

export const Profile = (props: profileProps) => {
    const [expanded, setExpanded] = useState(false)
    const [isClickedUpdateDisplayName, setIsClickedUpdateDisplayName] = useState(false)
    return (
        <View>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title>{props.user.email}</ListItem.Title>
                        <ListItem.Subtitle>DisplayName: {props.user.displayName}</ListItem.Subtitle>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
            ><View>
                <ListItem>
                    <ListItem.Content>
                        <Button title={'Update Display Name'} onPress={()=>{setIsClickedUpdateDisplayName(!isClickedUpdateDisplayName)}}/>
                        {isClickedUpdateDisplayName &&
                        <UpdateDisplayNameOverlay user={props.user} toggleOverlay={setIsClickedUpdateDisplayName}/>}
                    </ListItem.Content>
                </ListItem>
                {list.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar title={l.name[0]} source={{uri: l.avatar_url}}/>
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>
                ))}
            </View>
            </ListItem.Accordion>
            <Button title={'Log Out'} onPress={()=>{logOut()}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default Profile;