import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView} from "react-native";
import {Button} from 'react-native-elements'
import {Icon} from 'react-native-elements';
import {GymAccordionList} from "./components/GymAccordionList";

export const MyPass = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <GymAccordionList/>
                <Button title='New Gym' icon={<Icon name='add' size={20} color='white'/>}/>
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
