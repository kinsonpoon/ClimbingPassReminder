import React from 'react'
import {View, Picker, Text} from "react-native";
import {Button, Overlay} from "react-native-elements";
import {useState} from "react";
import {minusSharePass} from "../../../../localStorage/passStorage";
import {styles} from "../../../../styles";

interface MinusSharePassPopUpProps {
    count: number
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
    gymName: string
    sharePassType: string
    sharePassRef: any
}

export const MinusSharePassPopUp = (props: MinusSharePassPopUpProps) => {
    const [selectedValue, setSelectedValue] = useState('1');
    const submit = async () => {
        await minusSharePass(props.gymName, props.sharePassType, props.sharePassRef, parseInt(selectedValue))
        close()
        props.setLoading(true)
    };

    const close = () => {
        props.toggleOverlay(false)
    }

    return (
        <View>
            <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
                <View><Text>You have {props.count} {props.sharePassType} for now in {props.gymName}</Text>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={setSelectedValue}>
                        {[...Array(props.count)].map((e, i) => {
                            const number = i + 1
                            return <Picker.Item key={i} label={number.toString()} value={number.toString()}/>
                        })}
                    </Picker>
                    <Text>You will use {selectedValue} pass</Text>
                </View>
                <Button title="Confirm" onPress={submit}/>
            </Overlay>
        </View>
    )
}