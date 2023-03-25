import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import communityModalReducer from '../features/communityModalSlice';
import communityPageReducer from '../features/communityPageSlice';

import { apiSlice } from '@/features/api/apiSlice';

import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        auth: authReducer,
        communityModal: communityModalReducer,
        communityPage: communityPageReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
        }).concat(apiSlice.middleware)

});

// Infer the `RootState` and `AppDispatch` types from the store itself  
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


setupListeners(store.dispatch);