import React, {useState} from 'react';
import {View} from 'react-native';
import {ListItem, Avatar, Button} from 'react-native-elements';
import {logOut} from "../../../firebase/firebaseUserFunction";
import {UpdateDisplayNameOverlay} from "../components/overlay/updateDisplayNameOverlay";
import {styles} from "../../../styles";
import {writeUploadPasses} from "../../../firebase/user_database";
import {SearchUserOverlay} from "../components/overlay/searchUserOverlay";
import {findAllMyFd, findAllMyRequest} from "../../../firebase/friend_request_database";
import {FriendRequestOverlay} from "../components/overlay/friendRequestOverlay";
import {getAllSharePassFromOthers} from "../../../firebase/findSharePass_database";
import {FriendListOverlay} from "../components/overlay/friendListOverlay";

interface profileProps {
    user: any
    userLocal: any
    reloadStorage: () => void
    fds: any
    fdRequest: any
}

export const Profile = (props: profileProps) => {
    const [expanded, setExpanded] = useState(false)
    const [isClickedUpdateDisplayName, setIsClickedUpdateDisplayName] = useState(false)
    const [isClickSearch, setIsClickSearch] = useState(false)
    const [isClickedFriend, setIsClickedFriend] = useState(false)
    const [isClickedRequest, setIsClickedRequest] = useState(false)
    const uploadPassToCloud = async() =>{
        const [result,result2] = await Promise.all([writeUploadPasses(props.user.uid),getAllSharePassFromOthers()])
        props.reloadStorage()
        if(result=='Success'){
            alert('Async success')
        }
        else{
            alert(result)
        }
        console.log('uploaded')
    }

    return (
        <View>
            <View style={{backgroundColor: 'white'}}>
                <Button titleStyle={{color: 'black'}} buttonStyle={styles.uploadButton} title={'Async to cloud'}
                        onPress={ async() => {
                            await uploadPassToCloud()
                        }}/>
            </View>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title>{props.userLocal?.email}</ListItem.Title>
                        <ListItem.Subtitle>DisplayName: {props.userLocal?.username}</ListItem.Subtitle>
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
                            <UpdateDisplayNameOverlay
                                user={props.user}
                                userLocal={props.userLocal}
                                toggleOverlay={setIsClickedUpdateDisplayName}
                                reloadStorage={props.reloadStorage}/>}
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
                <SearchUserOverlay
                    user={props.user}
                    userLocal={props.userLocal}
                    toggleOverlay={setIsClickSearch}/>
                }
                <ListItem onPress={()=>{
                    if(props.fds.length>0){
                        setIsClickedFriend(!isClickedFriend)
                    }
                    else{
                        alert('You have not friend')
                    }
                    }} bottomDivider>
                    <Avatar icon={{name: 'users', type: 'font-awesome'}} containerStyle={{backgroundColor: 'black'}}/>
                    <ListItem.Content>
                        <ListItem.Title>Your Friends</ListItem.Title>
                        <ListItem.Subtitle>{props.fds.length}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                {isClickedFriend &&
                <FriendListOverlay
                    userLocal={props.userLocal} reloadParent={props.reloadStorage} toggleOverlay={setIsClickedFriend} data={props.fds}
                />}
                <ListItem bottomDivider onPress={()=>{
                    if(props.fdRequest.length>0){
                        setIsClickedRequest(!isClickedRequest)
                    }
                    else{
                        alert('You have not friend request')
                    }}}>
                    <Avatar icon={{name: 'envelope', type: 'font-awesome'}}
                            containerStyle={{backgroundColor: 'black'}}/>
                    <ListItem.Content>
                        <ListItem.Title>New Friends Request</ListItem.Title>
                        <ListItem.Subtitle>{props.fdRequest.length}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                {isClickedRequest && <FriendRequestOverlay  userLocal={props.userLocal} reloadParent={props.reloadStorage} toggleOverlay={setIsClickedRequest} data={props.fdRequest}/>}
            </View>
            </ListItem.Accordion>
            <Button title={'Log Out'} onPress={async() => {
                await logOut()
            }}/>
        </View>
    );
};

export default Profile;