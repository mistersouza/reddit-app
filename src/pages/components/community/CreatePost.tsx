import React from 'react'

import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '@/firebase/client'
import { openAuthModal } from '@/features/authSlice'

import { useDispatch } from 'react-redux'

import { UserIcon } from '@heroicons/react/20/solid'
import { PhotoIcon, LinkIcon } from '@heroicons/react/24/outline'

function CreatePost() {
    const router = useRouter(); 
    const [ user ] = useAuthState(auth);

    const dispatch = useDispatch();

    const handleCreatePost = () => {
        if (!user) {
            dispatch(openAuthModal('login'));
            return; 
        }

        const { community } = router.query;
        router.push(`/r/${community}/submit`)
    }
            
  return (
    <div className='flex mb-2 border border-gray-300 rounded-md space-x-1.5 pr-1.5 pt-1 pb-1.5 items-center justify-evenly bg-slate-50'>
        <UserIcon className='h-8 w-8 text-gray-400'/>
        <input 
            className='grow h-7 text-xs bg-gray-100 rounded-sm py-2 px-3 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent'
            placeholder='Create Post'
            onClick={handleCreatePost}
        />
        <div className='flex item-center cursor-pointer'>
            <div className='flex items-center py-1 px-1.5 hover:bg-gray-100 rounded-sm'>
                <PhotoIcon className='h-5 w-5  text-gray-400'/>
            </div>
            <div className='flex items-center py-1.5 px-2 hover:bg-gray-100 rounded-sm'>
                <LinkIcon className='h-4.5 w-3.5 text-gray-400' />
            </div>
        </div>
    </div>
  )
}

export default CreatePost