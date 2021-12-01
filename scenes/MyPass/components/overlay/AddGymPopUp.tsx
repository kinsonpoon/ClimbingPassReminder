import React from 'react'
import {View} from "react-native";
import {Button, Overlay, Text} from "react-native-elements";
import {useState} from "react";
import {styles} from "../../../../styles";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GOOGLE_API_KEY } from "@env";
import {addNewGym} from "../../../../localStorage/passStorage";
import {GymSelect} from "../../../../sharedComponent/select/GymSelect";

interface AddGymPopUpProps{
    setLoading: () => void
    toggleOverlay: (visible: boolean) => void
}

export const AddGymPopUp =(props: AddGymPopUpProps) => {
    const [gymName, setGymName] = useState('AtticV')
    const [error, setError] = useState(false)
    // const [openMapView, setOpenMapView] = useState(false)
    const submit = async() => {
        if(gymName!='') {
            // setOpenMapView(true)
            await addNewGym(gymName)
            close()
            props.setLoading()
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
                <GymSelect
                searchOption={gymName}
                setSearchOption={setGymName}/>
                <Text>U have selected {gymName}</Text>
                <Button title="Submit" onPress={submit} />
            </Overlay>
        </View>
    )
}