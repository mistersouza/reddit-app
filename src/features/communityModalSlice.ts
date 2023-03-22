import { createSlice } from '@reduxjs/toolkit';

export interface CommunityModalState {
    isOpen: boolean;
}

const initialState: CommunityModalState = {
    isOpen: false,
};

export const communityModalSlice = createSlice({
    name: 'communityModal',
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

export const { openCommunityModal, closeCommunityModal } = communityModalSlice.actions;

export default communityModalSlice.reducer;
