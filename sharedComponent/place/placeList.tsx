import React from "react";
import {
    FlatList,
    TouchableOpacity,
    View,
    ActivityIndicator
} from "react-native";
import {ListItem, Text} from "react-native-elements";

//Components
import {StyleSheet} from "react-native";

export const PlaceList = (places) => {
    const baseImage =
        "https://images.unsplash.com/photo-1552334405-4929565998d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

    return (
        <View>
            {places.length <= 0 && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" />
                </View>
            )}
            {places.length > 0 && (
                <FlatList
                    data={places}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <ListItem
                                key={item.id}
                                bottomDivider>
                                <ListItem.Title>
                                    <View style={styles.rowDirection}>
                                        <Text>{item.name}</Text>
                                        <Text>1.4km</Text>
                                    </View>
                                </ListItem.Title>
                            </ListItem>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>

    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    container2: {
        flex: 1,
        justifyContent: "center"
    },
    menuTitle: {
        fontSize: 16,
        fontFamily: "Poppins-Medium",
        color: "#575757",
        marginLeft: 20,
        marginTop: 10
    },
    mapView: {
        flex: 1,
        justifyContent: "center"
    },
    restaurantList: {
        flex: 1,
        justifyContent: "center"
    },
    chevron: {
        color: "#e90000"
    },
    rowDirection: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    startReviewsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center"
    }
});