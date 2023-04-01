// Importing the createApi and fakeBaseQuery from React-specific entry point
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';

import { firestore, storage } from '../../../src/firebase/client';
import { Post, Vote } from '../postsSlice';

// Define a single API slice object
export const apiSlice = createApi({
    // the cache reducer expects to be added at 'state.api' (already default - this is optional)
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Post', 'CommunitySnippet', 'Vote'],
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
            queryFn: async(post: Post) => {
                try {
                    const postRef = await addDoc(collection(firestore, 'posts'), post);
                    await updateDoc(postRef, { id: postRef.id });

                    return { data: { postRef } };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Post']
        }),
        vote: builder.mutation({
            queryFn: async(user: User, vote: Vote) => {
                
                try {
                    const voteRef = await addDoc(collection(firestore, `${user?.uid}/votes`), vote);
                    await updateDoc(voteRef, { id: voteRef.id });

                    return { data: { voteRef } };


                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Vote']
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
        updatePost: builder.mutation({
            queryFn: async(post: Post) => {
                try {
                    const postRef = doc(firestore, 'posts', post.id!);
                    await updateDoc(postRef, { ...post });
                    
                    return { data: post };
                } catch (error) {
                    return { data: post };
                }
            }
        }),
        uploadImage: builder.mutation({
            queryFn: async(postRef, file: string) => {

                try {
                    const imageRef = ref(storage, `posts/${postRef.id}/image`);
                    await uploadString(imageRef, file, 'data_url'); 
        
                    const imageUrl = await getDownloadURL(imageRef);
                    await updateDoc(postRef, { imageUrl })
                    
                    return { data: imageUrl };
                } catch (error) {
                    return { data: null };
                }
            },
            invalidatesTags: ['Post']
        }),
            
    })
});

export const { useFetchCommunityPostsQuery, useFetchCommunitySnippetsQuery, useDeletePostMutation, useCreatePostMutation, useUploadImageMutation, useVoteMutation } = apiSlice;

