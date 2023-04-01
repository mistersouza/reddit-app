import { Timestamp } from "@google-cloud/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { FieldValue } from "firebase/firestore";

export interface Post {
    id?: string;
    authorId: string;
    authorUsername: string | null;
    communityName: string | string[] | undefined;
    communityImageUrl?: string;
    title: string;
    text: string;
    voteStatus?: {
        id: string;
        value: number;
    };
    numberOfComments: number;
    numberOfUpvotes: number;
    imageUrl?: string;
    createdAt: Timestamp | FieldValue;
};

export interface Vote {
    id: string;
    postId: string;
    value: number;
    communityName: string;
};

export interface PostsState {
    posts: Post[];
    votes: Vote[];
    post: Post | null;
};

const initialState: PostsState = {
    posts: [],
    post: null,
    votes: []
};

export const postsSlice = createSlice({
    name: 'posts',
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
        },
        voteStatus: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        voteStatus: action.payload.voteStatus
                    }
                } else {
                    return post;
                }
            });
        }
    }
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;




