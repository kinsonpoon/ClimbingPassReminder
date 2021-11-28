import React, {useEffect} from 'react'
import {Platform, View, Text, Picker} from "react-native";
import {Button, Input, Overlay} from "react-native-elements";
import {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from "../../../../styles";
import {extendMemberShip} from "../../../../localStorage/passStorage";


interface ExtendMemberShipPopUpProps {
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
    lastEndDate: string
    gymName: string
}

function getNewStartDate(lastEndDate: string) {
    const dateArray = lastEndDate.split('/')
    const year = parseInt(dateArray[2])
    const month = parseInt(dateArray[0])
    const days = parseInt(dateArray[1])
    let newStartDate = new Date()
    newStartDate.setFullYear(year,month,days)
    console.log(newStartDate)
    if (newStartDate.getTime() < (new Date()).getTime()) {
        newStartDate = new Date()
    }
    return (
        newStartDate
    )
}

function getNewEndDate(startDate: Date, last: number){
    let newStartDate = new Date(startDate)
    newStartDate = new Date(newStartDate.getTime() + 1000*60*60*24*last)
    return newStartDate.toLocaleDateString()
}

export const ExtendMemberShipPopUp = (props: ExtendMemberShipPopUpProps) => {

    const [selectedValue,setSelectedValue] = useState('30')
    const [date, setDate] = useState(getNewStartDate(props.lastEndDate));
    const [show, setShow] = useState(false);
    const [showInput, setShowInput] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChangeCustomInput = (text) => {
        const numberText = text.replace(/[^0-9]/g, '')==''?0:text.replace(/[^0-9]/g, '')
        setSelectedValue(numberText)
    }

    const submit = async () => {
        const startDate = date.toLocaleDateString()
        const endDate = getNewEndDate(date,parseInt(selectedValue))
        await extendMemberShip(props.gymName, startDate, endDate, 0)
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
                    <Text>Extends Membership for {props.gymName}</Text>
                    <Text>Start From {date.toLocaleDateString()}</Text>
                    <Button style={styles.marginVer} title="Choose another Day" onPress={() => {
                        setShow(true)
                    }}/>
                    {show &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display={
                            Platform.OS === "ios" ? "spinner" : "default"
                        }
                        onChange={onChange}
                    />
                    }
                    {show && <Button style={styles.halfButton} title="Confirm Date" onPress={() => {
                        setShow(false)
                    }}/>}
                    <Text>New MemberShip last for {selectedValue} days</Text>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={setSelectedValue}>
                        <Picker.Item label={'30'} value={'30'}/>
                        <Picker.Item label={'90'} value={'90'}/>
                        <Picker.Item label={'120'} value={'120'}/>
                        <Picker.Item label={'365'} value={'365'}/>
                    </Picker>
                    <Button style={styles.marginVer} title="Custom input"
                            onPress={() => {setShowInput(!showInput)}}/>
                    {showInput &&
                    <Input
                        label='Days that last'
                        placeholder='days...'
                        keyboardType='numeric'
                        value={selectedValue}
                        onChangeText={onChangeCustomInput}
                    />
                    }
                    <Text>New MemberShip ends at {getNewEndDate(date, parseInt(selectedValue))}</Text>
                </View>
                <Button title="Submit"  onPress={submit}/>
            </Overlay>
        </View>
    )
}