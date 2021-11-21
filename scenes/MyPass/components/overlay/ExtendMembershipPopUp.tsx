import React from 'react'
import {Platform, View} from "react-native";
import {Button, Overlay} from "react-native-elements";
import {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';


interface ExtendMemberShipPopUpProps{
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
}

export const ExtendMemberShipPopUp =(props: ExtendMemberShipPopUpProps) => {
    const [error, setError] = useState(false)
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const submit = () => {
        close()
    };

    const close = () =>{
        props.toggleOverlay(false)
    }

    return (
        <View>
            <Overlay isVisible={true} onBackdropPress={close}>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display={
                        Platform.OS === "ios" ? "spinner" : "default"
                    }
                    onChange={onChange}
                    style={{width: 320, backgroundColor: "white"}}
                />
                <Button title="Submit" onPress={submit} />
            </Overlay>
        </View>
    )
}