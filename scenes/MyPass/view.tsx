import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar} from "react-native";

const DATA = [
    {
        title: "Month pass",
        data: [{
            gymName: 'Campus Climbing Gym',
            startDate: Date.UTC(2020, 1, 1),
            expireDate: Date.UTC(2021, 1, 1)
        }]
    },
    {
        title: "share day pass",
        data: [{
            gymName: 'Campus Climbing Gym',
            startDate: Date.UTC(2020, 1, 1),
            expireDate: Date.UTC(2021, 1, 1),
            count: 10
        }]
    },
    {
        title: "personal day pass",
        data: [{
            gymName: 'Campus Climbing Gym',
            startDate: Date.UTC(2020, 1, 1),
            expireDate: Date.UTC(2021, 1, 1),
            count: 5
        }]
    },
];

interface ItemProps {
    pass: {
        gymName: string,
        startDate: any,
        expireDate: any,
        count?: number
    }
}

const Item = (props: ItemProps) => {
    const startDate = new Date(props.pass.startDate).toLocaleDateString("en-US")
    const endDate = new Date(props.pass.expireDate).toLocaleDateString("en-US")
    return (
        <>
            <View style={styles.item}>
                <Text style={styles.title}>{props.pass.gymName}</Text>
                <Text style={styles.title}>start date: {startDate}</Text>
                <Text style={styles.title}>end date: {endDate}</Text>
            </View>
            {props.pass.count &&
            <Text style={styles.count}>count: {props.pass.count}</Text>}
        </>
    );
}

export const MyPass = () => {
    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item: any, index) => item + index}
                renderItem={({item}) => <Item pass={item}/>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
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
