import React from 'react'

import TimeAgo from 'react-timeago'; 

import { auth } from '@/firebase/client';
import { useAuthState } from 'react-firebase-hooks/auth';

import { UserCircleIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, ChatBubbleLeftIcon  } from '@heroicons/react/24/outline';
import Dropdown from './Dropdown'
import { Comment } from '@/features/commentsSlice';
 
type Props = {
    comment: Comment;
    onDelete: (comment: Comment) => void;
}

function Card({ comment, onDelete }: Props) {
    const [ user ] = useAuthState(auth);

  return (
    <div className='flex flex-col items-end'>
        <div className='flex w-full items-center gap-1'>
            <div className='flex'>
                <UserCircleIcon className='h-8 w-8 text-gray-300' />
            </div>
            <div className='flex items-center px-0.5 gap-1 text-xs text-gray-400'>
                <p className='text-gray-900 hover:cursor-pointer'>{comment.creatorDisplayName}</p>
                <TimeAgo date={comment.createdAt?.toDate()} />
            </div>
        </div>
        <div className='relative left-4 border-l border-b-gray-400 w-full px-5'>
            <div className='flex flex-col gap-1'>
                <p className='text-sm'>{comment.content}</p>
                <div className='flex items-center text-[0.6rem] font-semibold'>
                    <div className='flex items-center gap-0.5 cursor-pointer text-gray-500'>
                        <button 
                            className='w-5 h-5 cursor-pointer text.gray-500'
                            onClick={() => {}}
                        >
                            <ArrowUpCircleIcon/>
                        </button>
                        <p>{comment.numberOfUpvotes ? comment.numberOfUpvotes : 'Vote'}</p>
                        <button
                            className='w-5 h-5 cursor-pointer text.gray-500'
                            onClick={() => {}}
                        >
                            <ArrowDownCircleIcon />
                        </button>
                        <div className='flex p-1 items-center gap-0.5 hover:bg-gray-100 rounded-sm'>
                            <ChatBubbleLeftIcon  className='w-5 h-5'/>
                            <p>Reply</p>
                        </div>
                        <p className='p-1 hover:bg-gray-100 rounded-sm'>Share</p>
                    </div>
                    <Dropdown user={user} comment={comment} onDelete={onDelete} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card