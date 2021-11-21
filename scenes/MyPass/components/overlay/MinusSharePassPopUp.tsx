import React from 'react'
import {View} from "react-native";
import {Button, Input, Overlay} from "react-native-elements";
import {useState} from "react";

interface MinusSharePassPopUpProps{
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
}

export const MinusSharePassPopUp = (props: MinusSharePassPopUpProps) =>{
    const submit = () => {
        close()
    };

    const close = () =>{
        props.toggleOverlay(false)
    }

    return (
        <View>
            <Overlay isVisible={true} onBackdropPress={close}>
                <Button title="Confirm" onPress={submit} />
            </Overlay>
        </View>
    )
}