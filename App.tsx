import React, {useState} from 'react';
import Home from "./layout/main/main";

import {firebaseConfig} from "./firebase";
import firebase from "firebase/compat";



export default function App() {
    firebase.initializeApp(firebaseConfig)
    return (
            <Home/>
    );
}
