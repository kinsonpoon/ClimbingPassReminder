import React, {useState} from "react";
import {styles} from "../../../../styles";
import {Button, Input, Overlay, Text} from "react-native-elements";
import {Picker, TextInput, View} from "react-native";
import {searchUsers, writeUploadPasses} from "../../../../firebase/user_database";
import {addFd, findAllMyFd, findAllMyRequest} from "../../../../firebase/friend_request_database";
import {isThisAddable} from "../../../../localStorage/friendStorage";

interface SearchUserOverlayProps {
    toggleOverlay: (visible: boolean) => void
    user: any
}

export const SearchUserOverlay = (props: SearchUserOverlayProps) => {
    const [searchOption, setSearchOption]: any = useState('email')
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(true)
    const [errMessage, setErrMessage] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(true)
    const [emailErrMessage, setEmailErrMessage] = useState('')
    const [fireBaseRes, setFireBaseRes]: any = useState(null)
    const [fireBaseError, setFireBaseError]: any = useState('')
    const close = () => {
        props.toggleOverlay(false)
    }

    const submitSearchDisplayName = async () => {
        const [result2, result3] = await Promise.all([findAllMyRequest(props.user), findAllMyFd(props.user)])
        await searchUsers(searchOption=='email'?email:displayName, searchOption).then(res =>{
            if(res !=null && res != 'No user find'){
                isThisAddable(props.user, res.email).then( res2 =>{
                    if(res!=null){
                        alert(res2)
                        setFireBaseError(res2)
                    }
                    else{
                        setFireBaseRes(res)
                        setFireBaseError('')
                    }
                })
            }
            else{
                setFireBaseError('No user find')
            }
        }).catch(err =>{
            setFireBaseError(err)
        })
    }

    const sendFriendRequest = async() =>{
        await addFd(props.user, fireBaseRes)
    }

    function checkDisplayName(input) {
        setDisplayName(input)
        if (input.length < 3) {
            setError(true)
            setErrMessage('please set displayName with length >= 3')
        } else {
            setError(false)
            setErrMessage('')
        }
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function checkEmail(input) {
        setEmail(input)
        if (input.length < 1 || !validateEmail(input)) {
            setEmailError(true)
            setEmailErrMessage('EmailFormat not correct')
        } else {
            setEmailError(false)
            setEmailErrMessage('')
        }
    }

    return (
        <Overlay overlayStyle={styles.overlay} isVisible={true} onBackdropPress={close}>
            <View>
                <Text style={styles.overlayTitle}>Search</Text>
                <Picker
                    selectedValue={searchOption}
                    onValueChange={setSearchOption}>
                    <Picker.Item label={'Email'} value={'email'}/>
                    <Picker.Item label={'username'} value={'username'}/>
                </Picker>
                {searchOption == 'email' &&
                <View>
                    <Text style={{color:'grey', marginLeft:5}}>Enter Email</Text>
                    <TextInput
                        placeholder='...'
                        value={email}
                        onChangeText={checkEmail}
                    />
                    <Text>{emailErrMessage}</Text>
                </View>
                }
                {searchOption == 'username' &&
                <View>
                    <Text style={{color:'grey', marginLeft:5}}>Enter Display Name</Text>
                    <TextInput
                        placeholder='...'
                        value={displayName}
                        onChangeText={checkDisplayName}
                        autoCapitalize={'none'}
                    />
                    <Text>{errMessage}</Text>
                </View>
                }
                {fireBaseRes?.email && <Text>Email: {fireBaseRes?.email}</Text>}
                {fireBaseRes?.username && <Text>Email: {fireBaseRes?.username}</Text>}
                {fireBaseRes?.email && fireBaseRes?.username && !fireBaseError &&
                    <Button title="Send request" onPress={() => sendFriendRequest()}/>
                }
                <Text>{fireBaseError}</Text>
            </View>
            <Button title="Confirm" disabled={searchOption=='email'?emailError: error} onPress={() => submitSearchDisplayName()}/>
        </Overlay>
    )
}