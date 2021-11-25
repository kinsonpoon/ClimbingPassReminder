import React, {useState} from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from 'react-native-maps';
import { View } from "react-native";

//Components

import { StyleSheet } from "react-native";
import {PlaceList} from "../place/placeList";
import axios from "axios";

interface mapScreenProps{
    placeName: string
}


export const MapScreen = (props: mapScreenProps) => {
    const [lat, setLat]: any = useState(22.396428)
    const [long, setLong]: any = useState(114.109497)
    const [place, setPlace]: any[] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const placeType = 'Gym'
    const getCurrentLocation = () => {
        getPlaces();

    }
    const getPlacesUrl = (lat, long, radius, apiKey) => {
        const baseUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry`;
        const input = `&input=gym`;
        const location = `&locationbias=circle:${radius}@${lat},${long}`;
        const typeData = `&inputtype=textquery`;
        const api = `&key=${apiKey}`;
        // return `${baseUrl}${location}${input}${typeData}${api}`;
        return "/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&locationbias=circle:1500@22.396428,114.109497&input=campus&inputtype=textquery&key=AIzaSyDAv8TBixrdzEoegK2pRa4dwExWmMFNsig"
    }
    const getPlaces = () =>{
        const app_uri = 'https://maps.googleapis.com'
        const config={secure:false}
        const url = getPlacesUrl(lat, long, 1500, '12345');
        axios.create({baseURL: 'https://maps.googleapis.com', timeout:1000})
        axios.get(app_uri+url,).then( (res) =>{
            console.log(res)
        })
            .catch((err) =>{
                console.log(err)
            })
        // fetch(url, {mode: 'cors', keepalive: true, })
        //     .then(res => { alert(res) ;return res.json()})
        //     .then(res => {
        //         alert(res)
        //         res.results.map((element, index) => {
        //             const marketObj:any = {};
        //             marketObj.id = element.id;
        //             marketObj.name = element.name;
        //             marketObj.photos = element.photos;
        //             marketObj.rating = element.rating;
        //             marketObj.vicinity = element.vicinity;
        //             marketObj.marker = {
        //                 latitude: element.geometry.location.lat,
        //                 longitude: element.geometry.location.lng
        //             };
        //
        //             markers.push(marketObj);
        //         });
        //         //update our places array
        //         setPlace(markers)
        //     })
        //     .catch((err)=>{
        //         alert(err)
        //         console.log(err)
        //     });
    }
    getCurrentLocation()
    return (
        <View style={styles.container}>
            <View style={styles.mapView}>
                <MapView
                    style={{
                        flex: 1
                    }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    {place.map((marker, i) => (
                        <MapView
                            key={i}>
                            <Marker
                            coordinate={{
                                latitude: marker.marker.latitude,
                                longitude: marker.marker.longitude
                            }}
                            title={marker.name}/>
                        </MapView>
                    ))}
                </MapView>
            </View>
            <View style={styles.placeList}>
                <PlaceList places={place} />
            </View>
        </View>
    )
}



const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    mapView: {
        flex: 1,
        justifyContent: "center",
        height: "50%",
        width: "100%"
    },
    placeList: {
        flex: 1,
        justifyContent: "center"
    }
});