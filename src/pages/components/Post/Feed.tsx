import React, { useEffect, useState } from 'react'

import { Community } from '@/features/communitySlice';
import { useDeletePostMutation, useFetchCommunityPostsQuery } from '@/features/api/apiSlice';


import { RootState } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { Post as PostType, setPost, setPosts, setVotes, Vote } from '@/features/postsSlice';
import Post from './Post';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '@/firebase/client';

import { deleteObject, ref } from 'firebase/storage';
import { collection, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { openAuthModal } from '@/features/authSlice';


type Props = {
    community: Community;
}

function Feed({ community }: Props) {

    const { posts, votes } = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch();

    const [ user ] = useAuthState(auth)
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useFetchCommunityPostsQuery(community.name);
    
    const handleVote = async(post: PostType, value: number) => {
        // Only logged in users can vote
        if (!user) {
            dispatch(openAuthModal('login'));
            return;
        }; 
        
        try {
            let change = value;
            const { numberOfUpvotes, communityName } = post;
            // The value of the vote
            // Find out whether the user has voted on this post, and if so, what the vote value is
            const voteRecord = votes.find(vote => vote.postId === post.id);
            console.log({ voteRecord })
            console.log(post.id)
            const batch = writeBatch(firestore);
            
            if (!voteRecord) {
                // If the user hasn't voted on this post, add the vote
                const voteRef = doc(collection(firestore, 'users', `${user?.uid}/votes`));
                
                // Create the vote object
                // note to self: try work around bang operator and type assertion
                const newVote: Vote = {
                    id: voteRef.id,
                    postId: post.id!,
                    communityName: communityName as string,
                    value,
                };
                
                // Add the vote to the user's votes collection
                batch.set(voteRef, newVote);

                // Update the post's number of upvotes
                dispatch(setPost({ ...post, numberOfUpvotes: numberOfUpvotes + value })); 

                // Add the vote to the votes array
                dispatch(setVotes(newVote));

            } else {     
                const voteRef = doc(firestore, 'users', `${user?.uid}/votes/${voteRecord.id}`);

                // If the user has voted on this post, and the vote value is the same as the value passed to the function, remove the vote
                if (voteRecord.value === value) {
                    // Invert the vote value, so that if the user has upvoted, and then upvotes again, the vote value will be -1, and if the user has downvoted, and then downvotes again, the vote value will be 1
                    change *= -1;
                    // Update the post's number of upvotes
                    dispatch(setPost({ ...post, numberOfUpvotes: numberOfUpvotes - value })); 
                    
                    // Remove the vote from the votes array
                    dispatch(setVotes(votes.filter(vote => vote.id !== voteRecord.id))); 
                    
                    // Remove the vote from the user's votes collection
                    batch.delete(voteRef);  
                }

                // If the user has voted on this post, and the vote value is different from the value passed to the function, update the vote
                if (voteRecord.value !== value) {
                    // Double the value, so that if the user has upvoted, and then downvotes, the vote value will be -1, and if the user has downvoted, and then upvotes, the vote value will be 1
                    change *= 2;
                    
                    // Update the vote object with the new value
                    const updatedVote = {
                        ...voteRecord,
                        numberOfUpvotes: value,
                    };
    
                    // Update the vote in the user's votes collection
                    batch.update(voteRef, updatedVote);
    
                    // Update the post's number of upvotes
                    dispatch(setPost({ ...post, numberOfUpvotes: numberOfUpvotes + 2 * value })); 
    
                    // Update the vote in the votes array
                    dispatch(setVotes(updatedVote));
                }
            }

            const postRef = doc(firestore, 'posts', `${post.id}`);
            batch.update(postRef, { numberOfUpvotes: numberOfUpvotes + value });

            // Commit the batch
            await batch.commit();
            
            
        } catch (error) {
            console.log({error})
        }
    }

    const handleDeletePost = async(post: PostType): Promise<boolean> => {
        try {
            if (post.imageUrl) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }

            await deleteDoc(doc(firestore, 'posts', post.id!)); 

            dispatch(setPosts(posts.filter(item => item.id !== post.id)));
            
            return true;
        } catch (error) {
            console.log({'delete post': error});
            
            return false;
        }
    }

    
    const handleSelectPostClick = () => {
        console.log('select');
    }
    
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setPosts(data));
        } else if (isError && error) {
            console.log(error);
        }
    }, [isSuccess, isError, data, error, dispatch]);
    
  return (
    <div className='flex flex-col gap-1'>
        {posts.map((post: PostType) => (
            <Post key={post.id} post={post} isUserPost={post.authorId === user?.uid} onVote={handleVote} voteScore={votes.find(vote => vote.postId === post.id)?.value} deletePost={handleDeletePost} selectPost={handleSelectPostClick} />
        ))}
    </div>
  )
}

export default Feed