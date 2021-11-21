import React from 'react'
import {View} from "react-native";
import {Button, Input, Overlay} from "react-native-elements";
import {useState} from "react";
import {addNewGym} from "../../../../localStorage/passStorage";

interface AddGymPopUpProps{
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
}

export const AddGymPopUp =(props: AddGymPopUpProps) => {
    const [gymName, setGymName] = useState('')
    const [error, setError] = useState(false)
    const submit = () => {
        if(gymName!='') {
            addNewGym(gymName)
            close()
        }
        else{
            setError(true)
        }
    };

    const close = () =>{
        props.toggleOverlay(false)
    }

    return (
        <View>
            <Overlay isVisible={true} onBackdropPress={close}>
                <Input
                    label='Name'
                    placeholder='name...'
                    value={gymName}
                    onChangeText={setGymName}
                    errorMessage={error?'Input cannot be empty':''}
                    renderErrorMessage={error}
                />

                <Button title="Submit" onPress={submit} />
            </Overlay>
        </View>
    )
}