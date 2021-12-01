import React, {useState} from 'react';
import {SafeAreaView, StatusBar, ScrollView} from "react-native";
import {Button, Text} from 'react-native-elements'
import {Icon} from 'react-native-elements';
import {GymAccordionList} from "./components/GymAccordionList";
import {getAllPasses} from "../../localStorage/passStorage";
import {AddGymPopUp} from "./components/overlay/AddGymPopUp";
import {getAllFdsPassLocal} from "../../localStorage/friendStorage";

interface MyPassProps{
    loading: boolean,
    reloadFromChild: () => void
}

export const MyPass = (props: MyPassProps) => {
    const [getData, setGetData] = useState([])
    const [isAddGymPopUp, setIsAddGymPopUp] = useState(false)
    const [allFdPasses, setAllFdPasses] = useState([])

    if (props.loading) {
        Promise.all([getAllPasses(),getAllFdsPassLocal()]).then( res=>{
            setGetData(res[0]);
            setAllFdPasses(res[1])
        })
        return (<Text>Loading</Text>)
    }
    return (
        <SafeAreaView style={{flex: 1,
            paddingTop: StatusBar.currentHeight,}}>
            <ScrollView>
                {!props.loading && getData.length> 0 &&
                    <GymAccordionList allFdPasses={allFdPasses} gyms={getData} setLoading={props.reloadFromChild}/>
                }
                <Button title='New Gym' icon={<Icon name='add' size={20} color='white'/>}
                        onPress={() => setIsAddGymPopUp(true)}/>
                {isAddGymPopUp && <AddGymPopUp setLoading={props.reloadFromChild} toggleOverlay={setIsAddGymPopUp}/>}
            </ScrollView>
        </SafeAreaView>
    );
}