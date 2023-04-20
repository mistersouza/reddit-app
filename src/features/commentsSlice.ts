import { Timestamp } from "@google-cloud/firestore";
import { createSlice } from "@reduxjs/toolkit";


export interface Comment {
    id?: string;
    postTitle: string;
    createdBy: string;
    creatorDisplayName: string;
    communityName: string;
    numberOfUpvotes?: number;
    content: string;
    postId: string;
    createdAt: Timestamp;
}


export interface CommentsState {
    comments: Comment[];
}

const initialState: CommentsState = {
    comments: [],
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComment: (state, action) => {
            state.comments = [...state.comments, action.payload];
        },
        setComments: (state, action) => {
            state.comments = action.payload;
        }, 
    },
});

export const { setComment, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
