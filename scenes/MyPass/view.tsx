import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, ScrollView, View} from "react-native";
import {Button} from 'react-native-elements'
import {Icon} from 'react-native-elements';
import {GymAccordionList} from "./components/GymAccordionList";
import {getAllPasses} from "../../localStorage/passStorage";
import {AddGymPopUp} from "./components/overlay/AddGymPopUp";

export const MyPass = () => {
    const [loading, setLoading] = useState(true)
    const [getData, setGetData] = useState([])
    const [isAddGymPopUp, setIsAddGymPopUp] = useState(false)

    const setLoadingByChild = (value: boolean) =>{
        setLoading(value)
    }

    if (loading) {
        getAllPasses().then(res => {
            setGetData(res)
            setLoading(false)
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {!loading &&
                    <GymAccordionList gyms={getData} setLoading={setLoadingByChild}/>
                }
                <Button title='New Gym' icon={<Icon name='add' size={20} color='white'/>}
                        onPress={() => setIsAddGymPopUp(true)}/>
                {isAddGymPopUp && <AddGymPopUp setLoading={setLoading} toggleOverlay={setIsAddGymPopUp}/>}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    item: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        flexWrap: "nowrap",
        padding: 20,
        marginTop: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        flex: 0.3,
        fontSize: 12
    },
    count: {
        textAlign: "center"
    }
});
