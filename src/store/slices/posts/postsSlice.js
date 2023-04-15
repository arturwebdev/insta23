import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsAPI";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
        addComment(state, {payload: {postId, username, body}}) {
            const idx = state.data.findIndex(post => post.id === postId)
            state.data[idx].comments.push({
                id: new Date().getTime().toString(),
                username, body
            })
        },
        addPost(state, {payload}){
            state.data.unshift(payload)
        },
        delPost(state, {payload}){
            state.data = [
                ...state.data.filter(post => post.id !== payload)
            ]
        }

    },

    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.isLoading = true
        },
        [fetchPosts.fulfilled]: (state, {payload}) => {
            state.data = payload
            state.isLoading = false
        }
    }

})

export const selectPosts = state => state.posts

export const { addComment, addPost } = postsSlice.actions

export const postsReducer = postsSlice.reducer