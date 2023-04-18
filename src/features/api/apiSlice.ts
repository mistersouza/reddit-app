// Importing the createApi and fakeBaseQuery from React-specific entry point
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, orderBy, query, setDoc, updateDoc, where, writeBatch } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';

import { firestore, storage } from '../../../src/firebase/client';
import { Comment } from '../commentsSlice';
import { Post, Vote } from '../postsSlice';

// Define a single API slice object
export const apiSlice = createApi({
    // the cache reducer expects to be added at 'state.api' (already default - this is optional)
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Post', 'CommunitySnippet', 'Vote', 'Comment'],
    endpoints: builder => ({
        fetchCommunitySnippets: builder.query({
            queryFn: async(user) => {
                if (!user) return { data: [] };
                
                try {
                    const communitySnippetRef = collection(firestore, `users/${user.uid}/communitySnippets`); 
                    const querySnapShot = await getDocs(communitySnippetRef);

                    return { data: querySnapShot.docs.map(doc => ({ ...doc.data() })) }; 
                } catch (error: any) {
                    return { data: error};
                };
            },
            providesTags: ['CommunitySnippet']
        }),
        fetchCommunityPosts: builder.query({
            queryFn: async(communityName) => {
                try {
                    const postsQuery = query(collection(firestore, 'posts'), where('communityName', '==', communityName), orderBy('createdAt', 'desc'));
                    const querySnapShot = await getDocs(postsQuery);

                    return { data: querySnapShot.docs.map(doc => ({ ...doc.data() }))};
                } catch (error: any) {
                    return { data: error }; 
                }
            },
            providesTags: ['Post']
        }),
        fetchPost: builder.query({
            queryFn: async(postId) => {
                try {
                    const postRef = doc(firestore, 'posts', postId);   
                    const postSnapShot = await getDoc(postRef);

                    if (postSnapShot.exists()) {
                        return { data: { ...postSnapShot.data() } };
                    } else {
                        return { data: null };
                    }
                } catch (error: any) {
                    return { data: error };
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

        fetchCommunityVotes: builder.query({
            queryFn: async(user, communityName) => {
                try {

                    // where('communityName', '==', communityName) does not work
                    const votesQuery = query(collection(firestore, 'users', `${user?.uid}/votes`));
                    const querySnapShot = await getDocs(votesQuery);

                    return { data: querySnapShot.docs.map(doc => ({ Id: doc.id, ...doc.data() }))};
                } catch (error: any) {
                    return { data: error };
                }
            },
            providesTags: ['Vote']
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
        createComment: builder.mutation({
            queryFn: async(comment: Comment) => {
                try {
                    const batch = writeBatch(firestore);

                    const commentRef = doc(collection(firestore, 'comments'));

                    batch.set(commentRef, { ...comment, id: commentRef.id });

                    const postRef = doc(firestore, 'posts', comment.postId!);
                    batch.update(postRef, { numberOfComments: increment(1) });

                    await batch.commit();

                    return { data: { commentRef } };
                } catch (error) {
                    return { data: null };
                }
            },
            invalidatesTags: ['Comment']
        }),
        deleteComment: builder.mutation({
            queryFn: async(commentId: string) => {
                try {
                    const commentRef = doc(firestore, 'comments', commentId!);
                    const commentSnapShot = await getDoc(commentRef);

                    if (commentSnapShot.exists()) {
                        await deleteDoc(commentRef);
                        return { data: { commentId } };
                    } 

                    return { data: { commentId } };
                } catch (error) {
                    return { data: null };
                }
            },
            invalidatesTags: ['Comment']
        }),
        fetchComments: builder.query({  
            queryFn: async(post) => {
                // func should take postId, and query(collection(firestore, 'comments'), orderBy('createdAt', 'desc')) should
                try {
                    const commentsQuery = query(collection(firestore, 'comments'));
                    const querySnapShot = await getDocs(commentsQuery);
                    const comments = querySnapShot.docs.map(doc => ({ ...doc.data() }));
                    
                    // temp fix
                    return { data: comments.filter((comment) => comment.postId === post.id) };
                } catch (error) {
                    return { data: null };
                }
            },
            providesTags: ['Comment']
        }),
    })
});

export const { useFetchCommunityPostsQuery, useFetchCommunitySnippetsQuery, useFetchCommunityVotesQuery, useDeletePostMutation, useCreatePostMutation, useUploadImageMutation, useVoteMutation, useFetchPostQuery, useCreateCommentMutation, useDeleteCommentMutation, useFetchCommentsQuery } = apiSlice;

