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
    tagTypes: ['Post', 'CommunitySnippet', 'Vote', 'Comment', 'Image'],
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
            queryFn: async(community) => {
                try {
                    // prevent error when community is undefined
                    if (!community.name) {
                        console.log('community is undefined');
                        return { data: [] };
                    }; 
                    const postsQuery = query(collection(firestore, 'posts'), where('communityName', '==', community.name), orderBy('createdAt', 'desc'));
                    const querySnapShot = await getDocs(postsQuery);

                    return { data: querySnapShot.docs.map(doc => ({ ...doc.data() }))};
                } catch (error: any) {
                    return { data: error }; 
                }
            },
            providesTags: ['Post']
        }),
        fetchPost: builder.query({
            queryFn: async(pid: string) => {
                try {

                    if (!pid) {
                        console.log('pid id is undefined');
                        return { data: null };
                    }

                    const postRef = doc(firestore, 'posts', pid);   
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
            queryFn: async( { post, file }: { post: Post, file?: string }) => {
                try {
                    const postRef = await addDoc(collection(firestore, 'posts'), post);
                    await updateDoc(postRef, { id: postRef.id });

                    if (file) {
                        const imageRef = ref(storage, `posts/${postRef.id}/image`);
                        await uploadString(imageRef, file, 'data_url');

                        const imageUrl = await getDownloadURL(imageRef);
                        await updateDoc(postRef, { imageUrl });
                    }

                    console.log('imageUrl: ', post.imageUrl);

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
                    console.log({ error });
                    return { data: null };
                }
            }
        }),
        createComment: builder.mutation({
            queryFn: async(comment: Comment) => {
                try {
                    // create a batch to update multiple documents
                    const batch = writeBatch(firestore);

                    // create a reference to the comment and post
                    const commentRef = doc(collection(firestore, 'comments'));
                    const postRef = doc(firestore, 'posts', comment.postId!);

                    // add the comment and increment the number of comments on the post
                    batch.set(commentRef, { ...comment, id: commentRef.id });
                    batch.update(postRef, { numberOfComments: increment(1) });

                    // commit the batch to firestore
                    await batch.commit();

                    return { data: { commentRef } };
                } catch (error) {
                    return { data: null };
                }
            },
            invalidatesTags: ['Comment']
        }),
        deleteComment: builder.mutation({
            queryFn: async(comment: Comment) => {
                try {
                    // create a batch to update multiple documents
                    const batch = writeBatch(firestore);

                    // create a reference to the comment and post
                    const commentRef = doc(firestore, 'comments', comment.id!);
                    const postRef = doc(firestore, 'posts', comment.postId!);

                    // delete the comment and decrement the number of comments on the post
                    batch.delete(commentRef);
                    batch.update(postRef, { numberOfComments: increment(-1) });

                    // commit the batch to firestore
                    await batch.commit();

                    return { data: comment.id };
                } catch (error) {
                    return { data: null };
                }
            },
            invalidatesTags: ['Comment']
        }),
        fetchComments: builder.query({  
            queryFn: async(post) => {
            
                // prevent error when app is first loaded, and post is undefined
                if (!post.id) {
                    console.log('no post id');
                    return { data: [] };
                }

                try {
                    const commentsQuery = query(collection(firestore, 'comments'), where('postId', '==', post.id), orderBy('createdAt', 'desc'));
                    const querySnapShot = await getDocs(commentsQuery);


                    return { data: querySnapShot.docs.map(doc => ({ ...doc.data() }))};
                } catch (error: any) {
                    console.log({ error: error.message });
                    return { data: null };
                }
            },
            providesTags: ['Comment']
        }),
    })
});

export const { useFetchCommunityPostsQuery, useFetchCommunitySnippetsQuery, useFetchCommunityVotesQuery, useDeletePostMutation, useCreatePostMutation, useUploadImageMutation, useVoteMutation, useFetchPostQuery, useCreateCommentMutation, useDeleteCommentMutation, useFetchCommentsQuery } = apiSlice;

