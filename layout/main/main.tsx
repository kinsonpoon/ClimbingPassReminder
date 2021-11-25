import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {MyPass} from "../../scenes/MyPass/view";
import {ProfileScreen} from "../../scenes/Profile/view";

export const Home = () => {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName
                        console.log(route)
                        if (route.name === 'MyPass') {
                            iconName = 'compass-outline'
                        } else if (route.name === 'Profile') {
                            iconName = 'person-circle-outline'
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray'
                })}
            >
                <Tab.Screen name="MyPass" component={MyPass}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>

    )
};

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default Home;