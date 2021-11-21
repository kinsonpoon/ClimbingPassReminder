import React from 'react'
import {View, Picker} from "react-native";
import {Button, Overlay} from "react-native-elements";
import {useState} from "react";

interface MinusSharePassPopUpProps{
    count: number
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
}

export const MinusSharePassPopUp = (props: MinusSharePassPopUpProps) =>{
    const [selectedValue, setSelectedValue] = useState('1');
    const submit = () => {
        close()
    };

    const close = () =>{
        props.toggleOverlay(false)
    }

    return (
        <View>
            <Overlay isVisible={true} onBackdropPress={close}>
                <Picker
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}>
                    {[...Array(props.count)].map((e, i) => {
                    return <Picker.Item label={i.toString()} value={i.toString()} />})}
                </Picker>
                <Button title="Confirm" onPress={submit} />
            </Overlay>
        </View>
    )
}