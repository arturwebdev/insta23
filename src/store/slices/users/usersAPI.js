import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function(){
        const { data: usersData } = await axios.get('https://jsonplaceholder.typicode.com/users')
        const { data: postsData } = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=500')

        const data = [
            ...usersData.map(user => ({
                id: user.id.toString(),
                email: user.email.toLowerCase(),
                username: user.username.toLowerCase(),
                name: user.name,
                password: user.address.city.toLowerCase(),
                avatar: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`,
                followers: Math.round(Math.random() * 200 + 700),
                following: Math.round(Math.random() * 200 + 700),
                bio: user.company.catchPhrase,
                posts: [
                    ...postsData.filter(post => post.albumId === user.id)
                                .map(post => ({
                                    id: post.id + '_' + user.id,
                                    img: post.url,
                                    name: user.username.toLowerCase(),
                                    likesCount: Math.round(Math.random() * 500 + 300),
                                    postText: post.title.split(' ').slice(1).join(' '),
                                    timeAgo: Math.round(Math.random() * 7 + 2) + ' Minutes Ago',
                                    comments: []
                                }))
                ]
            }))
        ]

        return data
    }
)