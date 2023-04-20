import React, { useEffect } from 'react'

import PageLayout from '@/pages/components/layout/PageLayout'
import Post from '@/pages/components/Post/Post'


import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

import { useFetchPostQuery } from '@/features/api/apiSlice';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/client';
import PostHeader from '@/pages/components/Post/PostHeader';
import { useRouter } from 'next/router';
import { Post as PostType, setPost } from '@/features/postsSlice';
import About from '@/pages/components/community/About';
import Moderators from '@/pages/components/community/Moderators';
import Comments from '@/pages/components/Post/comments';
import { User } from 'firebase/auth';

const PostPage = () => {
    const [ user ] = useAuthState(auth)
    const { post, votes } = useSelector((state: RootState) => state.posts);
    const { currentCommunity: data } = useSelector((state: RootState) => state.communityPage);
    // page doesn't not load if you refresh the page. Post is null

  return (
        <div className='w-full'>
            <PostHeader />
            <PageLayout>
                <>
                    {post && <Post post={post} isUserPost={post.authorId === user?.uid} onVote={() => {}} voteScore={votes.find(vote => vote.postId === post.id)?.value} deletePost={() => {}} />}
                    <Comments user={user as User} post={post as PostType} />
                </>
                <>
                    {data && <About community={data} />}
                    <Moderators />
                </>
            </PageLayout>
        </div>
  )
}

export default PostPage