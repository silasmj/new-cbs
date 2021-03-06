import { Chatroom } from "../../entities/Chatroom";
import { ADD_CHATROOM, FETCH_CHATROOMS, TOGGLE_HAPPY } from "../actions/chat.actions";

interface ReduxState {
    chatrooms: Chatroom[]
    isHappy: boolean
    counter: number
    name: string
}

const initialState: ReduxState = {
    chatrooms: [],
    isHappy: false,
    counter: 0,
    name: "Peter"
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case TOGGLE_HAPPY:
            return { ...state, isHappy: !state.isHappy }

        case ADD_CHATROOM:
            return { ...state, chatrooms: [...state.chatrooms, action.payload] }
        

        case FETCH_CHATROOMS:
            return { ...state, chatrooms: action.payload }

        default:
            return state;
    }
};

export default chatReducer;