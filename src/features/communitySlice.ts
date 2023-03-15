import { createSlice } from '@reduxjs/toolkit';

export interface CommunityState {
    isOpen: boolean;
}

const initialState: CommunityState = {
    isOpen: false,
};

export const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        openCommunityModal: (state) => {
            state.isOpen = true;
        },
        closeCommunityModal: (state) => {
            state.isOpen = false;
        }, 
    },
});

export const { openCommunityModal, closeCommunityModal } = communitySlice.actions;

export default communitySlice.reducer;
