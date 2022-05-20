import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useFetchChatrooms, usePostChatrooms } from '../hooks/rqhooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";
import { useQueryClient } from 'react-query';
import { Chatroom, Status } from '../entities/Chatroom';


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "ReactQueryScreen"
>


export default function ReactQueryScreen() {
    const [title, onChangeTitle] = React.useState('');

    const navigation = useNavigation<ScreenNavigationType>()

    const { isLoading, isError, chatrooms, error} = useFetchChatrooms();

    const queryClient = useQueryClient();

    // Mutations
   const {mutate: createChatroom} = usePostChatrooms()



    if(isLoading) {
        return <Text>Loading...</Text>
    }    

    if(isError) {
        return <Text>Error: {error}</Text>
    }

    const renderChatroom = ({ item }: { item: any }) => (
            <Text>{item.title}</Text>
    );

    const rqHandleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, '', new Date());
        createChatroom(chatroom, {onSuccess: () => queryClient.invalidateQueries('chatrooms')})
    } 
    

    return (
        <View style={styles.container}>
            <FlatList
            data={chatrooms}
            renderItem={renderChatroom}
            keyExtractor={(item) => item.title}
            />
            <Text>react query</Text>
            <TextInput
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chatroom name"
            />
            <Button onPress={rqHandleAddChatroom} title="Create chatroom"/>

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
  