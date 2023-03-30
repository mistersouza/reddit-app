import React from 'react'

import { EnvelopeIcon } from '@heroicons/react/24/outline';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/client';

type Props = {}

function Moderators({}: Props) {
    const [ user ] = useAuthState(auth);
  return (
    <div className='flex flex-col space-y-3'>
        <div className='flex items-center justify-between bg-blue-500 p-3 rounded-sm text-xs text-white font-[600]'>
            <h3>Moderators</h3>
        </div>
        <div className='flex items-center pb-3 bg-white'>
            <button 
                className='flex items-center gap-1 justify-center btn-outline w-full'
            >
                <EnvelopeIcon className='w-5 h-4.5' />
                <span className='text-xs'>Message the mods</span>
            </button>
        </div>
        <div className='flex bg-white pb-3'>
            <p className='text-[0.6rem] text-blue-500 font-medium cursor-pointer'>r/{user?.displayName}</p>
        </div>
        <div className='flex justify-end bg-white pb-3'>
            <p className='text-xs text-right uppercase text-blue-500 font-semibold cursor-pointer'>View all moderators</p>
        </div>
    </div>
  )
}

export default Moderators