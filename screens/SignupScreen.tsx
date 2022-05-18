import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { rehydrateUser, signup } from '../store/actions/user.actions';

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    async function readPersistedUserInfo() {
        const token = await SecureStore.getItemAsync('idToken');
        const userJson = await SecureStore.getItemAsync('user');
        let user = null;
        if (userJson) {
            user = JSON.parse(userJson);
        }
        if (user) {
            // then we have a priv. login
            // restore the signup by updating the redux store based on usre and token.
            dispatch(rehydrateUser(user, token!))
        }
    }

    useEffect(() => {
        readPersistedUserInfo();
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Signup Screen</Text>
            <View>
                <TextInput style={styles.input} value={email} placeholder="Enter Email" onChangeText={setEmail} />
            </View>
            <TextInput style={styles.inputPw} value={password} placeholder="Enter Password" onChangeText={setPassword} secureTextEntry={true} />
            <Button title="Signup" onPress={() => dispatch(signup(email, password))} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    input: {
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        fontSize: 20,
        height: 50,
        width: 250,
    },
    inputPw: {
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        fontSize: 20,
        marginBottom: 20,
        height: 50,
        width: 250,
    }
})