import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from '../typings/navigations';
import { User } from '../entities/User';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import React, { useState } from 'react';

type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Profile">;

export default function ProfileScreen() {
    const navigation = useNavigation<ScreenNavigationType>();
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    console.log('bub', user);
    
    const [textEmail, setTextEmail] = useState(user.email)
    /*const [textName, setTextName] = useState(user.displayname)
    const [textStudyprogramme, setTextStudyprogramme] = useState(user.studyprogramme)*/


    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Text>{textEmail}</Text>
            <Text>{user.displayname}</Text>
            <Text>{user.studyprogramme}</Text>
            <Button title="Edit profile" onPress={() => navigation.navigate("EditProfile")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})