import React, {useState} from "react";
import {styles} from "../../../../styles";
import {Button, Input, Overlay, Text} from "react-native-elements";
import {forgetPassword, updateDisplayName} from "../../../../firebase/firebaseUserFunction";
import {View} from "react-native";
import {searchUsers} from "../../../../firebase/user_database";

interface SearchUserOverlayProps {
    toggleOverlay: (visible: boolean) => void
}

export const SearchUserOverlay = (props: SearchUserOverlayProps) => {
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(true)
    const [errMessage, setErrMessage] = useState('')
    const [fireBaseRes, setFireBaseRes] = useState('')
    const close = () => {
        props.toggleOverlay(false)
    }

    const submitUpdateDisplayName = async () => {
        const response = await searchUsers(displayName, 'username')
    }

    function checkDisplayName(input) {
        setDisplayName(input)
        if (input.length < 3) {
            setError(true)
            setErrMessage('please set displayName with length >= 3')
        } else {
            setError(false)
            setErrMessage('')
        }
    }


    return (
        <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
            <View>
                <Text style={styles.overlayTitle}>Search</Text>
                <Input
                    label='Display Name'
                    placeholder='name...'
                    value={displayName}
                    onChangeText={checkDisplayName}
                />
                <Text>{errMessage}</Text>
                <Text>{fireBaseRes}</Text>
            </View>
            <Button title="Confirm" disabled={error} onPress={() => submitUpdateDisplayName()}/>
        </Overlay>
    )
}