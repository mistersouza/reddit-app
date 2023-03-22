import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs } from 'firebase/firestore';

import { firestore } from '../../../firebase/client';

const getCommunitySnippets = async (userId: String) => {
    try {
        const communitySnippetRef = collection(firestore, `users/${userId}/communitySnippets`); 
        const querySnapShot = await getDocs(communitySnippetRef);
        
        return querySnapShot.docs.map(doc => ({...doc.data()}));   
    } catch (error) {
        return {error: error};
    }
}

export const communitySnippetsApi = createApi({
    reducerPath: 'communitySnippetsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        fetchCommunitySnippets: builder.query({
            queryFn(userId: any) {
                getCommunitySnippets(userId);
            }
        }),
    })
});

export const { useFetchCommunitySnippetsQuery } = communitySnippetsApi;

