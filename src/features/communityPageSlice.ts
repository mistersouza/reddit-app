import { createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';


export interface CommunitySnippet {
    communityName: string;
    isModerator: boolean;
    imageUrl?: string;
} 

export interface CommunityPageState {
    name: string;
    description?: string;
    creatorId: string;
    privacyType: 'public' | 'restricted' | 'private';
    numberOfMembers: number;
    createdAt?: Timestamp;
    imageUrl?: string;
    communitySnippets: CommunitySnippet[];
}


const initialState: CommunityPageState = {
    name: '',
    description: '',
    creatorId: '',
    privacyType: 'public',
    numberOfMembers: 0,
    communitySnippets: [],
};

export const communityPageSlice = createSlice({
    name: 'communityPage',
    initialState,
    reducers: {
        setCommunityPage: (state, action) => {
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.creatorId = action.payload.creatorId;
            state.privacyType = action.payload.privacyType;
            state.numberOfMembers = action.payload.numberOfMembers;
            state.createdAt = action.payload.createdAt;
            state.communitySnippets = action.payload.communitySnippets;
        },
        joinCommunity: (state, action) => {
            state.numberOfMembers += 1;
            state.communitySnippets.push(action.payload);
        },
        leaveCommunity: (state, action) => {
            state.numberOfMembers -= 1;
            state.communitySnippets = state.communitySnippets.filter(snippet => snippet.communityName !== action.payload.communityName);
        }
    }
});

export const { setCommunityPage, joinCommunity, leaveCommunity } = communityPageSlice.actions;

export default communityPageSlice.reducer;


