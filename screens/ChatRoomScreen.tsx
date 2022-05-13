import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "ChatRoomScreen"
>

export default function ChatRoomScreen() {
    return (
        <View style={styles.container}>
            <Text>Chatroom</Text>
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