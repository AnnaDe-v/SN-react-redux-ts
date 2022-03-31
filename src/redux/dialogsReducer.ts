import {v1} from "uuid";

export type dialogType = {
    name: string
    id: number
}
export type messageType = {
    id: string
    text: string
    owner: boolean
}

export type dialogsStateType = typeof initState

const initState = {
    dialogs: [
        {name: "Inna", id: 1},
        {name: "Alex", id: 2},
        {name: "Max", id: 3},
    ] as Array<dialogType>,
    messages: [
        {id: v1(), text: 'Hello', owner: false},
        {id: v1(), text: 'Hi, how are you?', owner: true},
    ] as Array<messageType>,
    newMessageValue: '',
}

const dialogsReducer = (state: dialogsStateType = initState, action: dialogsActionTypes): dialogsStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return state.newMessageValue.trim()
                ? {
                    ...state,
                    messages: [
                        ...state.messages,
                        {id: v1(), text: state.newMessageValue, owner: true}
                    ],
                    newMessageValue: '',
                }
                : {...state, newMessageValue: ''}
        case ON_MESSAGE_CHANGE:
            return {...state, newMessageValue: action.newValue}
        default:
            return state
    }
}

export const ADD_MESSAGE = "ADD-MESSAGE";
export const ON_MESSAGE_CHANGE = "ON-MESSAGE-CHANGE";


export type dialogsActionTypes = AddMessageAType | OnMessageChangeActionType
export type AddMessageAType = ReturnType<typeof addMessage>
export type OnMessageChangeActionType = ReturnType<typeof onMessageChange>

export const addMessage = () => ({type: ADD_MESSAGE} as const)
export const onMessageChange = (newValue: string) => ({type: ON_MESSAGE_CHANGE, newValue} as const)


export default dialogsReducer