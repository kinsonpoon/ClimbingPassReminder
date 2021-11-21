import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';


const list = [
    {
        name: 'Amy Farha',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }]

export const Profile = () => {
    const [expanded, setExpanded] = useState(false)
    return (
        <ListItem.Accordion
            content={
                    <ListItem.Content>
                        <ListItem.Title>Gym1</ListItem.Title>
                    </ListItem.Content>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
        ><View>
            {list.map((l, i) => (
                <ListItem key={i} bottomDivider>
                    <Avatar title={l.name[0]} source={{uri: l.avatar_url}}/>
                    <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            ))}
        </View>
        </ListItem.Accordion>
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