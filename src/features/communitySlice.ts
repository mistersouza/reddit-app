import { createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';


export interface CommunitySnippet {
    communityName: string;
    isModerator?: boolean;
    imageUrl?: string;
} 

export interface Community {
    name: string;
    description?: string;
    createdBy: string;
    privacyType: 'public' | 'restricted' | 'private';
    numberOfMembers: number;
    createdAt?: Timestamp;
    imageUrl?: string;
}

export interface CommunityState {
    communities: Community[];
    currentCommunity?: Community; 
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
            const { currentCommunity, communitySnippets } = action.payload;
            
            if (currentCommunity) {
                state.currentCommunity = currentCommunity;
                state.communities.push(currentCommunity);
                state.communitySnippets.push({
                    communityName: currentCommunity.name,
                    isModerator: true,
                    imageUrl: currentCommunity.imageUrl
                });
            }
        },
        joinCommunity: (state, action) => {
            const { currentCommunity } = action.payload;
            
            if (currentCommunity) {
                state.currentCommunity!.numberOfMembers += 1;
                state.communitySnippets.push(action.payload);
            }
        },

        leaveCommunity: (state, action) => {
            const { currentCommunity } = action.payload;
            if (currentCommunity) {
                state.currentCommunity!.numberOfMembers -= 1;
                state.communitySnippets = state.communitySnippets.filter(snippet => snippet.communityName !== action.payload.communityName);
            }
        }
    }
});

export const { setCommunity, joinCommunity, leaveCommunity } = communitySlice.actions;

export default communitySlice.reducer;


