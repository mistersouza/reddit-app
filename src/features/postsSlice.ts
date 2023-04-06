import { Timestamp } from "@google-cloud/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { FieldValue } from "firebase/firestore";

export interface Post {
    id?: string;
    authorId: string;
    authorUsername: string | null;
    communityName: string | undefined;
    communityImageUrl?: string;
    title: string;
    text: string;
    
    /* voteStatus?: {
        id: string;
        value: number;
    }; */
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
    post: Post | null;
    posts: Post[];
    votes: Vote[];
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
        setPost: (state, action) => {
            state.post = action.payload;
        },

        setPosts: (state, action) => {
            if (!state.posts.length) {
                state.posts = action.payload;
            }

            if (state.posts.length) {
                state.posts = state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            ...action.payload
                        }
                    } 
                    return post;
                });
            }
        },

        setVotes: (state, action) => {
            if (!state.votes.length) {
                state.votes.push(action.payload);
            }

            if (state.votes.length) {
                state.votes = state.votes.map(vote => {
                    if (vote.id === action.payload.id) {
                        return {
                            ...vote,
                            value: action.payload.value
                        }
                    }
                    return vote;
                });
            }
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

export const { setPost, setPosts, setVotes } = postsSlice.actions;

export default postsSlice.reducer;




