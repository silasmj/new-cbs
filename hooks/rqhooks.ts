import { getStateFromPath } from '@react-navigation/native';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Chatroom } from '../entities/Chatroom';


const baseURL = "https://cbs-project-df515-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=";


export const useFetchChatrooms = () => {
    const fetchChatrooms = async() => {
        return await axios.get(baseURL)
    }
    const {isLoading, isError, data, error} = useQuery('chatrooms', fetchChatrooms)

    let chatrooms: Chatroom[] = []
    for(const key in data?.data) {
        const chatroom = data?.data[key]
        chatrooms.push(new Chatroom(chatroom.title, chatroom.status.UNREAD, '', new Date()))
    }
    return{
        isLoading, isError, chatrooms, error
    }
}

