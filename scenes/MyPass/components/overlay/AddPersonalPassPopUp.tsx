import React, {useEffect} from 'react'
import {Platform, View, Text, Picker} from "react-native";
import {Button, Input, Overlay} from "react-native-elements";
import {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from "../../../../styles";
import {addSharePass, extendMemberShip} from "../../../../localStorage/passStorage";


interface AddPersonalPassPopUpProps {
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
    gymName: string
}

function getNewStartDate() {
    let newStartDate = new Date()
    return newStartDate
}

function getNewEndDate(startDate: Date, last: number) {
    let newStartDate = new Date(startDate)
    newStartDate = new Date(newStartDate.getTime() + 1000 * 60 * 60 * 24 * last)
    return newStartDate.toLocaleDateString()
}

export const AddPersonalPassPopUp = (props: AddPersonalPassPopUpProps) => {
    const [selectedValue, setSelectedValue] = useState('90')
    const [date, setDate] = useState(getNewStartDate());
    const [count, setCount] = useState('0');
    const [showInput, setShowInput] = useState(false);

    const onChangeCustomInput = (text) => {
        const numberText = text.replace(/[^0-9]/g, '') == '' ? 0 : text.replace(/[^0-9]/g, '')
        setSelectedValue(numberText)
    }

    const onChangeCustomInputCount = (text) => {
        const numberText = text.replace(/[^0-9]/g, '') == '' ? 0 : text.replace(/[^0-9]/g, '')
        setCount(numberText)
    }

    const submit = async () => {
        const startDate = date.toLocaleDateString()
        const endDate = getNewEndDate(date, parseInt(selectedValue))
        await addSharePass(props.gymName, 'personalPass',startDate, endDate, parseInt(count))
        close()
        props.setLoading(true)
    };

    const close = () => {
        props.toggleOverlay(false)
    }

    return (
        <View>
            <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
                <View>
                    <Text>Add SharePass for {props.gymName}</Text>
                    <Text>expire in {getNewEndDate(date, parseInt(selectedValue))}</Text>
                    <Text>New share pass last
                        for {selectedValue == '99999' ? 'ever' : selectedValue + ' days'}</Text>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={setSelectedValue}>
                        <Picker.Item label={'Never'} value={'99999'}/>
                        <Picker.Item label={'90'} value={'90'}/>
                        <Picker.Item label={'120'} value={'120'}/>
                        <Picker.Item label={'365'} value={'365'}/>
                    </Picker>
                    <Button style={styles.marginVer} title="Custom input"
                            onPress={() => {
                                setShowInput(!showInput)
                            }}/>
                    {showInput &&
                    <Input
                        label='Expires after'
                        placeholder='day...'
                        keyboardType='numeric'
                        value={selectedValue}
                        onChangeText={onChangeCustomInput}
                    />
                    }
                </View>
                <View>
                    <Input
                        label='Number of passes'
                        placeholder='pass...'
                        keyboardType='numeric'
                        value={count}
                        onChangeText={onChangeCustomInputCount}
                    />
                    <Button title="Submit" onPress={submit}/>
                </View>
            </Overlay>
        </View>
    )
}