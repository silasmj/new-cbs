import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from '../typings/navigations';
import { User } from '../entities/User';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import React, { useState } from 'react';
import colors from '../constants/colors';


type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Profile">;

export default function ProfileScreen() {
    const navigation = useNavigation<ScreenNavigationType>();
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    console.log('bub', user);
    
    const [textEmail, setTextEmail] = useState(user.email)
    /*const [textName, setTextName] = useState(user.displayname)
    const [textStudyprogramme, setTextStudyprogramme] = useState(user.studyprogramme)*/


    return (
        <View style={styles.screen}>
                <Text style={styles.title}>Profile Screen</Text>
                <View style={styles.textBox}>
                    <Text>Email: {textEmail}</Text>
                    <Text>Name: {user.displayname}</Text>
                    <Text>Study Programme: {user.studyprogramme}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Edit profile" onPress={() => navigation.navigate("EditProfile")} color={colors.accent}/>
                    </View>
                </View>
        </View>

        
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        color: 'green'
    },
    textBox: {
        paddingVertical: 5,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        paddingVertical: 10
    },
    button: {
        backgroundColor: 'red',
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 2
    },


});