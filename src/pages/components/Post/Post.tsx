import React, { useState } from 'react'
import TimeAgo from 'react-timeago'; 

import { Post, setPosts, Vote } from '@/features/postsSlice';

import { ArrowUpCircleIcon as ArrowUpCircleIconOutline, ArrowDownCircleIcon as ArrowDownCircleIconOutline, ChatBubbleLeftIcon, GiftIcon, ArrowUturnRightIcon, EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ArrowUpIcon as ArrowUpIconSolid, ArrowDownIcon as ArrowDownIconSolid } from '@heroicons/react/20/solid'


import Image from 'next/image';
import PostDropdown from './PostDropdown';
import { useDeletePostMutation, useVoteMutation } from '@/features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Router from 'next/router';

type Props = {
    voteScore: number | undefined;
    post: Post;
    isUserPost: boolean;
    onVote: (post: Post, value: number) => void;
    onDeletePost: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, post: Post) => Promise<boolean>;
    onSelectPost?: (post: Post) => void;
}

function Post ({
    post,
    isUserPost,
    voteScore,
    onVote,
    // deletePost,
    onSelectPost,

}: Props) {
    const { posts } = useSelector((state: RootState) => state.posts);
    const [ deletePost ] = useDeletePostMutation();
    // const [ vote ] = useVoteMutation();

    const { active } = post; 
    const dispatch = useDispatch();
    
    const handleDeleteClick = async(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        try {
            await deletePost(post);

            dispatch(setPosts(posts.filter(item => item.id !== post.id)));

            Router.push(`/r/${post.communityName}`);

        } catch(error: any) {
            console.log({ message: error.message })
        }
    }


  return (
    <div 
        className={`flex border ${!active ? 'border-gray-300 rounded-sm bg-white hover:border-gray-500 cursor-pointer' : 'border-white rounded-t-md'}`}
        // is this the right way to do this?
        onClick={() => onSelectPost && onSelectPost(post)}
    >
        <div className='flex flex-col items-center px-2 pt-2 bg-gray-100'>
            <button 
                className={`w-5 h-5 cursor-pointer ${voteScore == 1 ? 'text-red-500' : 'text.gray-500' }`}
                onClick={() => onVote(post, 1)}
            >
                <ArrowUpCircleIconOutline />
            </button>
            <p className='text-[.6rem] font-semibold'>{post.numberOfUpvotes ? post.numberOfUpvotes : 'Vote'}</p>
            <button
                className={`w-5 h-5 cursor-pointer ${voteScore == -1 ? 'text-blue-500' : 'text.gray-500' }`}
                onClick={() => onVote(post, -1)}
            >
                <ArrowDownCircleIconOutline />
            </button>
        </div>
        <div className='flex flex-col grow pt-2'>
            <div className='flex flex-col px-1'>
                <div className='flex gap-0.5 text-[.6rem] text-gray-400'>
                    <p>Posted by u/{post.authorUsername}</p>
                    <TimeAgo date={post.createdAt?.toDate()} />
                </div>
                <p className='font-[600]'>
                    <span className='rounded-lg mr-1 py-0.5 px-1 bg-red-800 text-[.6rem] text-white'>Video</span>
                    {post.title}
                </p>
                <p className='text-sm text-gray-700'>{post.text}</p>
                {post.imageUrl && (
                    <div className='relative my-1 w-full h-72 overflow-hidden'>
                        <Image 
                            src={post.imageUrl}
                            fill
                            style={{ objectFit: 'contain' }}
                            unoptimized
                            alt='Post Image'
                        />
                    </div>
                )}    
            </div>
            <div className='flex grow py-1.5 text-xs text-gray-500 font-[600] items-center gap-2'>
                <div className='flex p-1 items-center gap-0.5 hover:bg-gray-100 rounded-sm'>
                    <ChatBubbleLeftIcon  className='w-5 h-5'/>
                    <p>{post.numberOfComments ? post.numberOfComments : 'Comments'}</p>
                </div>
                <div className='flex p-1 gap-0.5 items-center hover:bg-gray-100 rounded-sm'>
                    <GiftIcon className='w-5 h-5' />
                    <p>Award</p>
                </div>
                <div className='flex p-1 gap-0.5 items-center hover:bg-gray-100 rounded-sm'>
                    <ArrowUturnRightIcon className='w-5 h-5' />
                    <p>Share</p>
                </div>
                {isUserPost && (
                    <div 
                        className='flex p-1 gap-0.5 items-center hover:bg-gray-100 rounded-sm'
                        onClick={handleDeleteClick}
                    >
                        <TrashIcon className='w-5 h-5' />
                        <p>Delete</p>
                    </div>  
                )}
                <PostDropdown />
            </div>
        </div>
    </div>
  )
}

export default Post