import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatrooms, toggleHappy } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";
import ChatRoom from "./ChatRoomScreen";


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Screen1"
>

export default function Screen1() {
    const navigation = useNavigation<ScreenNavigationType>()
    const [title, onChangeTitle] = React.useState('');

    const isHappy = useSelector((state: any) => state.chat.isHappy) // subscribe to redux store and select attribute (isHappy)
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)

    // console.log("isHappy", isHappy);
    const dispatch = useDispatch()

    useEffect(() => { // only runs dispatch the first time the component renders
        dispatch(fetchChatrooms())
    }, [])

    const handleAddChatroom = () => {
        console.log('hej');
        
        const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, '', new Date());
        dispatch(addChatroom(chatroom));
    }
    const renderChatroom = ({ item }: { item: any }) => (
        
        <TouchableOpacity style={styles.ChatButton}>
            <Text onPress={() => navigation.navigate("ChatRoomScreen")}>{item.title}</Text>
        </TouchableOpacity>

    );
   /* const redirect = () => {
        navigation.navigate('ChatRoom');
    }*/

    return (
        <View style={styles.container}>
            <Text>Screen 1</Text>
            <Button title="Go to screen 2" onPress={() => navigation.navigate("Screen2")} />
            <Text>{isHappy.toString()}</Text>
            <Button title="Toggle happy" onPress={() => dispatch(toggleHappy())} />

            <FlatList
                data={chatrooms}
                renderItem={renderChatroom}
            />

            <TextInput
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chatroom name"
            />
            <Button title="Create chatroom" onPress={handleAddChatroom} />

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
    ChatButton: {
        justifyContent: 'space-between',
        padding: 8,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "pink"

    }
   
})