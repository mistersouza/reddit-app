import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import communityReducer from '../features/communitySlice';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        auth: authReducer,
        community: communityReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself  
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;