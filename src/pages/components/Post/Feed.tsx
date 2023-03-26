import React, { useEffect, useState } from 'react'

import { CommunityPageState } from '@/features/communityPageSlice';
import { useFetchCommunityPostsQuery } from '@/features/api/apiSlice';


import { RootState } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { Post as PostType, setPosts } from '@/features/postsSlice';
import Post from './Post';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/client';


type Props = {
    community: CommunityPageState;
}

function Feed({ community }: Props) {
    const dispatch = useDispatch();
    const { posts } = useSelector((state: RootState) => state.posts);

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

    const handleDeletePostClick = () => {
        console.log('delete');
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
            <Post key={post.id} post={post} isUserPost={post.authorId === user?.uid} vote={handleVote} voteScore={1} deletePost={handleDeletePostClick} selectPost={handleDeletePostClick} />
        ))}
    </div>
  )
}

export default Feed