import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts/postsSlice";
import { searchReducer } from "./slices/search/searchSlice";
import { addPost, delPost, ignoreSpaceComment } from "./middlewares/posts";
import { ignoreAllCapitalSize, ignoreSearchSpace } from "./middlewares/search";
import { usersReducer } from "./slices/users/usersSlice";
import { messagesReducer } from "./slices/messages/messagesSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    posts: postsReducer,
    search: searchReducer,
    users: usersReducer,
    messages: messagesReducer
})

const persistConfig = {
    key: 'insta23',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }), ignoreSpaceComment, ignoreSearchSpace, ignoreAllCapitalSize, addPost, delPost ]
})

export const persistor = persistStore(store)

export default store    