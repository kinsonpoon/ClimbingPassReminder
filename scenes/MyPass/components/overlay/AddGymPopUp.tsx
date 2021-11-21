import React from 'react'
import {View} from "react-native";
import {Button, Input, Overlay} from "react-native-elements";
import {useState} from "react";
import {addNewGym} from "../../../../localStorage/passStorage";
import {styles} from "../../../../styles";

interface AddGymPopUpProps{
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
}

export const AddGymPopUp =(props: AddGymPopUpProps) => {
    const [gymName, setGymName] = useState('')
    const [error, setError] = useState(false)
    const submit = async() => {
        if(gymName!='') {
            await addNewGym(gymName)
            close()
            props.setLoading(true)
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
            <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
                <Input
                    label='Name'
                    placeholder='name...'
                    value={gymName}
                    onChangeText={setGymName}
                    errorMessage={'Input cannot be empty'}
                    renderErrorMessage={error}
                />
                <Button title="Submit" onPress={submit} />
            </Overlay>
        </View>
    )
}