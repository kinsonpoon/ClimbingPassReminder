import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Avatar, Button} from 'react-native-elements';
import {logOut} from "../../../firebase/firebaseUserFunction";
import {UpdateDisplayNameOverlay} from "../components/overlay/updateDisplayNameOverlay";
import {styles} from "../../../styles";

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

interface profileProps {
    user: any
}

export const Profile = (props: profileProps) => {
    const [expanded, setExpanded] = useState(false)
    const [isClickedUpdateDisplayName, setIsClickedUpdateDisplayName] = useState(false)
    return (
        <View>
            <View style={{backgroundColor: 'white'}}>
                <Button titleStyle={{color: 'black'}} buttonStyle={styles.uploadButton} title={'Upload to cloud'}
                        onPress={() => {
                        }}/>
            </View>
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
                        <View>
                            <Button title={'Update Display Name'} onPress={() => {
                                setIsClickedUpdateDisplayName(!isClickedUpdateDisplayName)
                            }}/>
                            {isClickedUpdateDisplayName &&
                            <UpdateDisplayNameOverlay user={props.user} toggleOverlay={setIsClickedUpdateDisplayName}/>}
                        </View>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <Avatar icon={{name: 'search', type: 'font-awesome'}} containerStyle={{backgroundColor: 'black'}}/>
                    <ListItem.Content>
                        <ListItem.Title>Find my Friends</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                <ListItem bottomDivider>
                    <Avatar icon={{name: 'users', type: 'font-awesome'}} containerStyle={{backgroundColor: 'black'}}/>
                    <ListItem.Content>
                        <ListItem.Title>Your Friends</ListItem.Title>
                        <ListItem.Subtitle>10</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                <ListItem bottomDivider>
                    <Avatar icon={{name: 'envelope', type: 'font-awesome'}}
                            containerStyle={{backgroundColor: 'black'}}/>
                    <ListItem.Content>
                        <ListItem.Title>New Friends Request</ListItem.Title>
                        <ListItem.Subtitle>10</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            </View>
            </ListItem.Accordion>
            <Button title={'Log Out'} onPress={() => {
                logOut()
            }}/>
        </View>
    );
};

export default Profile;