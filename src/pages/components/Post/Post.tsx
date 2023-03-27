import React, { useState } from 'react'
import TimeAgo from 'react-timeago'; 

import { Post } from '@/features/postsSlice';

import { ArrowUpCircleIcon as ArrowUpCircleIconOutline, ArrowDownCircleIcon as ArrowDownCircleIconOutline, ChatBubbleLeftIcon, GiftIcon, ArrowUturnRightIcon, EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ArrowUpIcon as ArrowUpIconSolid, ArrowDownIcon as ArrowDownIconSolid } from '@heroicons/react/20/solid'


import Image from 'next/image';
import PostDropdown from './PostDropdown';

type Props = {
    post: Post;
    isUserPost: boolean;
    voteScore: number;
    vote: (postId: string, vote: number) => void;
    deletePost: (post: Post) => Promise<boolean>;
    selectPost: () => void;
}

function Post ({
    post,
    isUserPost,
    vote,
    deletePost,
    selectPost,

}: Props) {
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    const handleDeleteClick = async() => {
        try {
            const isDeleted = await deletePost(post);
            
            if (!isDeleted) throw new Error('Uh-oh, something went wrong. Please try again.');

        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }
  return (
    <div 
        className='flex border border-gray-300 rounded-sm pt-2 bg-white hover:border-gray-500 cursor-pointer'
        onClick={() => {}}
    >
        <div className='flex flex-col items-center px-2 bg-gray-50'>
            <button 
                className='w-5 h-5 text-gray-500 cursor-pointer'
                onClick={() => {}}
            >
                <ArrowUpCircleIconOutline />
            </button>
            <p className='text-[.6rem] font-semibold'>{post.numberOfUpvotes ? post.numberOfUpvotes : 'Vote'}</p>
            <button
                className='w-5 h-5 text-gray-500 cursor-pointer'
                onClick={() => {}}
            >
                <ArrowDownCircleIconOutline />
            </button>
        </div>
        <div className='flex flex-col grow'>
            <div className='flex flex-col px-1'>
                <div className='flex gap-0.5 text-[.6rem] text-gray-400'>
                    <p>Posted by u/{post.authorUsername}</p>
                    <TimeAgo date={post.createdAt.toDate()} />
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
                    <p>Comments</p>
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