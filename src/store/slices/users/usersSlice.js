import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersData: [],
        currentUser: null
    },
    reducers: {
        logIn(state, {payload: {email, password}}){
            state.currentUser = state.usersData.find(user => (user.email === email || user.username === email) && user.password === password) || null
        },
        logOut(state){
            state.currentUser = null
        },
        addPost(state, {payload}){
            const idx = state.usersData.findIndex(user => user.id === state.currentUser.id)

            state.usersData[idx].posts.unshift(payload)
            state.currentUser.posts.unshift(payload)
        },
        delPost(state, {payload}){
            const idx = state.usersData.findIndex(user => user.id === state.currentUser.id)
            const postIdx = state.currentUser.posts.findIndex(post => post.id === payload)

            state.currentUser.posts.splice(postIdx ,1)
            state.usersData[idx].posts.splice(postIdx ,1)
        }
    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, {payload}) => {
            state.usersData = [...payload]
        }
    }   
})

export const selectUsers = state => state.users

export const { logIn, logOut, addPost } = usersSlice.actions

export const usersReducer = usersSlice.reducer
