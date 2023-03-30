// Importing the createApi and fakeBaseQuery from React-specific entry point
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';

import { firestore, storage } from '../../../src/firebase/client';
import { Post } from '../postsSlice';

// Define a single API slice object
export const apiSlice = createApi({
    // the cache reducer expects to be added at 'state.api' (already default - this is optional)
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Post', 'CommunitySnippet'],
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
            },
            providesTags: ['CommunitySnippet']
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
            },
            providesTags: ['Post']
        }),
        createPost: builder.mutation({
            queryFn: async(post: Post, file: string) => {
                try {
                    const postRef = await addDoc(collection(firestore, 'posts'), post);
                    await updateDoc(postRef, { id: postRef.id });

                
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            queryFn: async(post: Post) => {
                const { id, imageUrl, communityName } = post;

                try {
                    if (imageUrl) {
                        const imageRef = ref(storage, `posts/${id}/image`);
                        await deleteObject(imageRef);
                    }
                    const postRef = doc(firestore, 'posts', id!);
                    const postSnapShot = await getDoc(postRef);

                    if (postSnapShot.exists()) {
                        await deleteDoc(postRef);
                        return { data: { id, communityName } };

                    } else {
                        return { data: { id, communityName } };
                    }
                } catch (error) {
                    return { data: { id, communityName } };
                }
            },
            invalidatesTags: ['Post']
        }),
    })
});

export const { useFetchCommunityPostsQuery, useFetchCommunitySnippetsQuery, useDeletePostMutation, useCreatePostMutation } = apiSlice;

