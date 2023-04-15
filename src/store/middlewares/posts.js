export const ignoreSpaceComment = store => next => action => {
    if (action.type === 'posts/addComment' && !action.payload.body.trim()) {
        return
    }

    next(action)
}


export const addPost = store => next => action => {
    if (action.type === 'addPost') {
        const post = {
            id: new Date().getTime().toString(),
            img: action.payload.img,
            name: store.getState().users.currentUser.username,
            likesCount: Math.round(Math.random() * 500 + 300),
            postText: action.payload.postText,
            timeAgo: Math.round(Math.random() * 7 + 2) + ' Minutes Ago',
            comments: []
        }
        store.dispatch({type: 'users/addPost', payload: {...post}})
        store.dispatch({type: 'posts/addPost', payload: {...post}})
        return
    }

    next(action)
}

export const delPost = store => next => action => {
    if (action.type === 'delPost') {
        store.dispatch({type: 'users/delPost', payload: action.payload})
        store.dispatch({type: 'posts/delPost', payload: action.payload})
        return
    }
    next(action)
}