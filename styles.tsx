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
        height: '90%',
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
    overlayTitle:{
      fontSize: 25,
      textAlign: "center",
      marginBottom: 10
    },
    uploadButton: {
        width: '60%',
        marginLeft: '20%',
        backgroundColor: 'orange'
    },
    signUpButton: {},
    loginButton:{},
    forgetPasswordButton:{},
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
    textInputTitle: {
        color:'grey',
        marginLeft:8,
        fontWeight: "bold"
    },
    textInputContainer: {
        marginLeft:8,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        fontSize:20,
        minHeight: 30
    }
})