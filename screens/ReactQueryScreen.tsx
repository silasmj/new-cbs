import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFetchChatrooms } from '../hooks/rqhooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "ReactQueryScreen"
>


export default function ReactQueryScreen() {

    const navigation = useNavigation<ScreenNavigationType>()

    const { isLoading, isError, chatrooms, error} = useFetchChatrooms();

    if(isLoading) {
        return <Text>Loading...</Text>
        
    }
    //console.log('Hello', chatrooms);
    

    if(isError) {
        return <Text>Error: {error}</Text>
    }

    const renderChatroom = ({ item }: { item: any }) => (
            <Text>{item.title}</Text>

    );

    return (
        <View style={styles.container}>
            <FlatList
            data={chatrooms}
            renderItem={renderChatroom}
            />
            <Text>react query</Text>
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
  