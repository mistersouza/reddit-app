import React, { useEffect, useState } from 'react'

import { CommunityPageState } from '@/features/communityPageSlice';
import { useFetchCommunityPostsQuery } from '@/features/api/apiSlice';


import { RootState } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { Post as PostType, setPosts } from '@/features/postsSlice';
import Post from './Post';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '@/firebase/client';

import { deleteObject, ref } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';


type Props = {
    community: CommunityPageState;
}

function Feed({ community }: Props) {

    const { posts } = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch();

    const [ user ] = useAuthState(auth)
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useFetchCommunityPostsQuery(community.name);

    const handleVote = (postId: string, vote: number) => {
        console.log(postId, vote);
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
            <Post key={post.id} post={post} isUserPost={post.authorId === user?.uid} vote={handleVote} voteScore={1} deletePost={handleDeletePost} selectPost={handleSelectPostClick} />
        ))}
    </div>
  )
}

export default Feed