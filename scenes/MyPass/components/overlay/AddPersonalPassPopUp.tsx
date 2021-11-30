import React, {useState} from 'react'
import {Picker, Text, View} from "react-native";
import {Button, Input, Overlay} from "react-native-elements";
import {styles} from "../../../../styles";
import {addSharePass} from "../../../../localStorage/passStorage";


interface AddPersonalPassPopUpProps {
    setLoading: (loading: boolean) => void
    toggleOverlay: (visible: boolean) => void
    gymName: string
}

function getNewStartDate() {
    return new Date()
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
        let numberText = text.replace(/[^0-9]/g, '') == '' ? '0' : text.replace(/[^0-9]/g, '')
        if(numberText[0]==0 && numberText.length>1){
            numberText = numberText.substring(1)
        }
        setSelectedValue(numberText)
    }

    const onChangeCustomInputCount = (text) => {
        let numberText = text.replace(/[^0-9]/g, '') == '' ? '0' : text.replace(/[^0-9]/g, '')
        if(numberText[0]==0 && numberText.length>1){
            numberText = numberText.substring(1)
        }
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
                    <Button buttonStyle={styles.marginVer} title="Custom input"
                            onPress={() => {
                                setShowInput(!showInput)
                            }}/>
                    {showInput &&
                    <Input
                        label='Expires after'
                        placeholder='day...'
                        value={selectedValue}
                        onChangeText={onChangeCustomInput}
                    />
                    }
                </View>
                <View>
                    <Input
                        label='Number of passes'
                        placeholder='pass...'
                        value={count}
                        onChangeText={onChangeCustomInputCount}
                    />
                    <Button title="Submit" onPress={submit}/>
                </View>
            </Overlay>
        </View>
    )
}