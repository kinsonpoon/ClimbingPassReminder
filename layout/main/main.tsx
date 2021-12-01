import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {MyPass} from "../../scenes/MyPass/view";
import {ProfileScreen} from "../../scenes/Profile/view";
import {getAllFds, getAllFriendRequest} from "../../localStorage/friendStorage";
import {getUserLocal} from "../../localStorage/passStorage";

export const Home = () => {
    const Tab = createBottomTabNavigator();
    const [loading, setLoading] = useState(false)
    const [userLocal, setUserLocal]: any = useState(undefined)
    const [relationship, setRelationship]: any = useState([])
    const [requests, setRequest]: any = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const reloadFromChild = () => {
        setRefreshKey(refreshKey + 1)
    }

    useEffect(() => {
        async function fetchAsyncStorage() {
            console.log('reload')
            setLoading(true)
            const allFds = await getAllFds();
            setRelationship(allFds)
            const allRequests = await getAllFriendRequest();
            setRequest(allRequests)
            const userLocalData = await getUserLocal();
            setUserLocal(userLocalData)
        }

        fetchAsyncStorage().then(res => {
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        });
    }, [refreshKey])

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName
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
                <Tab.Screen name="MyPass"
                            children={() => <MyPass loading={loading} reloadFromChild={reloadFromChild}/>}/>
                <Tab.Screen name="Profile"
                                children={()=>
                                    <ProfileScreen loading={loading} userLocal={userLocal}
                                                   relationship={relationship} requests={requests}
                                                   reloadFromChild={reloadFromChild}/>} />

            </Tab.Navigator>
        </NavigationContainer>

                                )
                            };

                                export default Home;