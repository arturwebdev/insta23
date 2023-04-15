import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        allMessages: [],
        currentDialog: [],
        activeUserId: ''
    },
    reducers: {
        toggleActive(state, {payload: {fromId, toId}}){
            state.activeUserId = toId

            state.currentDialog = [...state.allMessages.filter(message => (
                (message.toId === toId && message.fromId === fromId) ||
                (message.toId === fromId && message.fromId === toId) 
            ))]
        },
        addMessage(state, {payload}){
            const message = {
                id: new Date().getTime().toString(),
                toId: state.activeUserId,
                ...payload
            }

            state.allMessages.push({...message})
            state.currentDialog.push({...message})
        },
        resetActive(state) {
            state.activeUserId = ''
            state.currentDialog = []
        }
    }
})

export const selectMessages = state => state.messages

export const {toggleActive, addMessage, resetActive} = messagesSlice.actions

export const messagesReducer = messagesSlice.reducer