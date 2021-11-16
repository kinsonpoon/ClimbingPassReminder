import React from 'react';
import { StyleSheet } from 'react-native';

export const Profile = () => {
    return (
        <div>
            My Profile
        </div>
    );
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

export default Profile;