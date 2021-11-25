import React, {useState} from "react";
import {styles} from "../../../../styles";
import {Button, Input, Overlay, Text} from "react-native-elements";
import {forgetPassword, updateDisplayName} from "../../../../firebase/firebaseUserFunction";
import {View} from "react-native";

interface UpdateDisplayNameOverlayProps {
    user: any
    toggleOverlay: (visible: boolean) => void
}

export const UpdateDisplayNameOverlay = (props: UpdateDisplayNameOverlayProps) => {
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(true)
    const [errMessage, setErrMessage] = useState('')
    const [fireBaseRes, setFireBaseRes] = useState('')
    const close = () => {
        props.toggleOverlay(false)
    }

    const submitUpdateDisplayNAme = async () => {
        const response = await updateDisplayName(props.user, displayName)
        if (response !== 'success') {
            setFireBaseRes(response)
        }
        else{
            setFireBaseRes('Updated')
        }
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
                <Text style={styles.overlayTitle}>Update Display Name</Text>
                <Input
                    label='Display Name'
                    placeholder='name...'
                    value={displayName}
                    onChangeText={checkDisplayName}
                />
                <Text>{errMessage}</Text>
                <Text>{fireBaseRes}</Text>
            </View>
            <Button title="Confirm" disabled={error} onPress={() => submitUpdateDisplayNAme()}/>
        </Overlay>
    )
}