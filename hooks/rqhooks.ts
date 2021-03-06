import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { Chatroom } from '../entities/Chatroom';

function helper() {
    const token = useSelector((state: any) => state.user.idToken)
    
    return {token};
}

const baseURL = "https://cbs-project-df515-default-rtdb.europe-west1.firebasedatabase.app//chatrooms.json?auth=";

export const useFetchChatrooms = () => {
    var { token } = helper()

    const fetchChatrooms = async() => {
        return await axios.get(baseURL + token)
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

export const usePostChatrooms = () => {
    var { token } = helper()
    return useMutation((newChatroom: Chatroom) => {
        return axios.post(baseURL + token, newChatroom)
    })
}

