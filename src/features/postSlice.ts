import { Timestamp } from "@google-cloud/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { FieldValue } from "firebase/firestore";

export interface Post {
    id?: string;
    communityName: string | string[] | undefined;
    authorId: string;
    authorUsername: string | null;
    title: string;
    text: string;
    numberOfComments: number;
    numberOfUpvotes: number;
    imageUrl?: string;
    communityImageUrl?: string;
    createdAt: Timestamp | FieldValue;
};

export interface PostState {
    posts: Post[];
    post: Post | null;
};

const initialState: PostState = {
    posts: [],
    post: null,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        postVotes: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        numberOfUpvotes: action.payload.numberOfUpvotes
                    }
                } else {
                    return post;
                }
            });
        }
    }
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;




