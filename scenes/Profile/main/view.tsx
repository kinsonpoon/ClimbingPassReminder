import React, {useState} from 'react';
import {View} from 'react-native';
import {ListItem, Avatar, Button} from 'react-native-elements';
import {logOut} from "../../../firebase/firebaseUserFunction";
import {UpdateDisplayNameOverlay} from "../components/overlay/updateDisplayNameOverlay";
import {styles} from "../../../styles";
import {writeUploadPasses} from "../../../firebase/user_database";
import {SearchUserOverlay} from "../components/overlay/searchUserOverlay";

interface profileProps {
    user: any
}

export const Profile = (props: profileProps) => {
    const [expanded, setExpanded] = useState(false)
    const [isClickedUpdateDisplayName, setIsClickedUpdateDisplayName] = useState(false)
    const [isClickSearch, setIsClickSearch] = useState(false)


    const uploadPassToCloud = async() =>{
        const result = await writeUploadPasses(props.user.uid)
        if(result=='Success'){
            alert('Upload success')
        }
        else{
            alert(result)
        }
    }

    return (
        <View>
            <View style={{backgroundColor: 'white'}}>
                <Button titleStyle={{color: 'black'}} buttonStyle={styles.uploadButton} title={'Upload to cloud'}
                        onPress={() => {
                            uploadPassToCloud()
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
                <ListItem bottomDivider onPress={()=>{setIsClickSearch(!isClickSearch)}}>
                    <Avatar icon={{name: 'search', type: 'font-awesome'}} containerStyle={{backgroundColor: 'black'}}/>
                    <ListItem.Content>
                        <ListItem.Title>Find my Friends</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                {isClickSearch &&
                <SearchUserOverlay toggleOverlay={setIsClickSearch}/>
                }
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