import { Post } from '@/features/postsSlice'
import { LinkIcon, ListBulletIcon, PhotoIcon, PlayIcon, ShieldExclamationIcon, TableCellsIcon } from '@heroicons/react/24/outline'
import { User } from 'firebase/auth'
import React from 'react'

type Props = {
    post: Post
    user: User
    comment: string,
    setComment: React.Dispatch<React.SetStateAction<string>>
    onComment: (comment: string) => void
}

export default function Input({user, comment, post, setComment, onComment}: Props) {

  return (
    <div className='w-11/12 flex flex-col'>
        {user && (
            <>
                <p className='text-xs mb-1'>
                    Comment as {' '}
                    <span className='text-[#3182ce]'>{user.displayName || user?.email?.split('@')[0]}</span>
                </p>
                <textarea
                    className='w-full m-h-24 outline-0 px-3 py-1.5 resize-y border border-b-0 rounded-md rounded-b-none pb-10 text-sm placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black focus:ring-opacity-5'
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    placeholder='What are your thoughts?'
                />
                <div className='flex justify-between px-1 py-1 rounded-b-md bg-gray-200 border border-t-0 border-black gap-1'>
                    <div className='flex items-center justify-start text-gray-500'>
                        <div className='flex pl-3 py-2 gap-2'>
                            <LinkIcon className='h-4 w-4.5' />
                        <   ShieldExclamationIcon className='h-4 w-4.5' />
                        </div>
                        <div className='flex pl-3 py-2 gap-2 border-l border-l-gray-200'>
                            <ListBulletIcon className='h-4 w-4.5' />
                        </div>
                        <div className='flex pl-3 py-2 gap-2 border-l border-l-gray-200'>
                            <TableCellsIcon className='h-4 w-4.5'/>
                            <PhotoIcon className='h-4 w-4.5' />
                            <PlayIcon className='h-4 w-4.5' />
                        </div>
                    </div>
                    <div>

                        <button 
                            className='btn py-0.5 bg-transparent text-blue-600 text-[0.6rem] capitalize hover:shadow-sm hover:brightness-90'
                        >Markdown mode</button>
                        <button 
                            className='btn-solid text-[0.6rem] py-0.5'
                            disabled={!comment}
                            onClick={() => onComment(comment)}
                        >Comment</button>
                    </div>
                    </div>
            </>)}
    </div>
  )
}   