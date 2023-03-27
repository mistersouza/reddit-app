// Importing the createApi and fakeBaseQuery from React-specific entry point
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { firestore } from '../../../src/firebase/client';

// Define a single API slice object
export const apiSlice = createApi({
    // the cache reducer expects to be added at 'state.api' (already default - this is optional)
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(),
    endpoints: builder => ({
        fetchCommunitySnippets: builder.query({
            queryFn: async(user) => {
                if (!user) return;
                
                try {
                    const communitySnippetRef = collection(firestore, `users/${user.uid}/communitySnippets`); 
                    const querySnapShot = await getDocs(communitySnippetRef);

                    return { data: querySnapShot.docs.map(doc => ({ ...doc.data() })) }; 
                } catch (error) {
                    return {'fetchCommunitySnippets error': error};
                };
            }
        }),
        fetchCommunityPosts: builder.query({
            queryFn: async(name) => {
                try {
                    const postsQuery = query(collection(firestore, 'posts'), where('communityName', '==', name), orderBy('createdAt', 'desc'));
                    const querySnapShot = await getDocs(postsQuery);

                    return { data: querySnapShot.docs.map(doc => ({ ...doc.data() }))};
                } catch (error: any) {
                    console.log({'fetchCommunityPosts error': error.message})
                }
            }
        }),
    })
});

export const { useFetchCommunityPostsQuery, useFetchCommunitySnippetsQuery } = apiSlice;

