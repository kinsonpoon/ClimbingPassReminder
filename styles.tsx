import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    subAccordion: {
        marginLeft: 10
    },
    subSubAccordion:{
        marginLeft: 20
    },
    overlay:{
        width: '80%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    halfButton:{
      width: '50%',
        left: '25%',
        right: '25%',
        marginVertical:5
    },
    marginVer:{
        marginVertical: 5
    },
    extendButton:{
        marginLeft: 50,
        backgroundColor: 'black'
    },
    addButton:{
        marginLeft: 50,
        backgroundColor: 'green'
    },
    useButton:{
        backgroundColor: 'red',
        marginLeft: 50,
    },
    passCountText:{
        alignSelf: "flex-end"
    },
    minusButton:{
        borderColor: 'black',
        bottom:-5
    },
    minusButtonTitle: {
        color: 'black'
    },
})