import { createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';


export interface CommunitySnippet {
    communityName: string;
    isModerator: boolean;
    imageUrl?: string;
} 

export interface Community {
    name: string;
    description?: string;
    creatorId: string;
    privacyType: 'public' | 'restricted' | 'private';
    numberOfMembers: number;
    createdAt?: Timestamp;
    imageUrl?: string;
}

export interface CommunityState {
    communities: Community[];
    currentCommunity: Community; 
    communitySnippets: CommunitySnippet[];
}

const initialState: CommunityState = {
    currentCommunity: {
        name: '',
        description: '',
        creatorId: '',
        privacyType: 'public',
        numberOfMembers: 0,
    },
    communities: [],
    communitySnippets: []
};

export const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        setCommunity: (state, action) => {
            state.currentCommunity.name = action.payload.name;
            state.currentCommunity.description = action.payload.description;
            state.currentCommunity.creatorId = action.payload.creatorId;
            state.currentCommunity.privacyType = action.payload.privacyType;
            state.currentCommunity.numberOfMembers = action.payload.numberOfMembers;
            state.currentCommunity.createdAt = action.payload.createdAt;
            state.communitySnippets = action.payload.communitySnippets;
        },
        joinCommunity: (state, action) => {
            state.currentCommunity.numberOfMembers += 1;
            state.communitySnippets.push(action.payload);
        },
        leaveCommunity: (state, action) => {
            state.currentCommunity.numberOfMembers -= 1;
            state.communitySnippets = state.communitySnippets.filter(snippet => snippet.communityName !== action.payload.communityName);
        }
    }
});

export const { setCommunity, joinCommunity, leaveCommunity } = communitySlice.actions;

export default communitySlice.reducer;


