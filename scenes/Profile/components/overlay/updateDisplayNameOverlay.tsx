import React, {useState} from "react";
import {styles} from "../../../../styles";
import {Button, Input, Overlay, Text} from "react-native-elements";
import {TextInput, View} from "react-native";
import {updateUserName} from "../../../../firebase/user_database";

interface UpdateDisplayNameOverlayProps {
    user: any
    userLocal: any
    toggleOverlay: (visible: boolean) => void
    reloadStorage: () => void
}

export const UpdateDisplayNameOverlay = (props: UpdateDisplayNameOverlayProps) => {
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(true)
    const [errMessage, setErrMessage] = useState('')
    const [fireBaseRes, setFireBaseRes] = useState('')
    const close = () => {
        props.toggleOverlay(false)
    }

    const submitUpdateDisplayName = async () => {
        await updateUserName(props.user, displayName).then( res =>{
            if( res!== 'Success'){
                setFireBaseRes(res)
            }
            else{
                setFireBaseRes('Updated')
                props.reloadStorage()
            }
        })
            .catch(err =>{
                setFireBaseRes(err)
            })
    }

    const validateUsername = (username) => {
        return username.match(
            /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
        );
    };

    function checkDisplayName(input) {
        input = input.replace(' ','_')
        setDisplayName(input)
        if(props.userLocal?.username && input == props.userLocal.username){
            setError(true)
            setErrMessage('please set a different displayName')
        }
        else if (input.length < 3) {
            setError(true)
            setErrMessage('please set displayName with length >= 3')
        }
        else if(!validateUsername(input)){
            setError(true)
            setErrMessage('Username not match instagram rules')
        }else {
            setError(false)
            setErrMessage('')
        }
    }


    return (
        <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
            <View>
                <Text style={styles.overlayTitle}>Update Display Name</Text>
                <Text style={styles.textInputTitle}>New Displayname</Text>
                <TextInput
                    style={styles.textInputContainer}
                    placeholder='name...'
                    value={displayName}
                    onChangeText={checkDisplayName}
                    autoCapitalize={"none"}
                />
                <Text>{errMessage}</Text>
                <Text>{fireBaseRes}</Text>
            </View>
            <Button title="Confirm" disabled={error} onPress={() => submitUpdateDisplayName()}/>
        </Overlay>
    )
}