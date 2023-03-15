import React from 'react'
import Link from 'next/link'

import { openCommunityModal } from '@/features/communityModalSlice';
import { useDispatch } from 'react-redux';

type Props = {
    error: string;
}

const NotFound = ({ error }: Props) => {
    const dispatch = useDispatch();

  return (
    <div className='flex flex-col items-center text-center p-3.5 justify-center h-screen space-y-5 bg-gray-300'>
        <div className='w-20 h-20 rounded-full bg-gray-400'></div>
        <h3 className='text-base'>{error}</h3>
        <p className='text-xs'>This community may have been banned or the community name is incorrect.</p>
        <div className='flex gap-2'>
            <button 
                className='btn-outline text-sm md:text-xs capitalize'
                onClick={() => dispatch(openCommunityModal())}
            >
                Create Community
            </button> 
            <Link href={'/'}>
                <button className='btn-solid text-sm md:text-xs uppercase'>Go home</button>   
            </Link>
        </div>
        <p className='max-w-sm py-5 px-1 text-[.6rem] text-gray-500 text-center'>
            Use of this site constitutes acceptance of our <Link href={'/'}><span className='underline'>user agreement</span></Link> and <Link href={'/'}><span className='underline'>privacy policy</span></Link>. ©2023 reddit inc. All rights reserved. <span className='uppercase'>Reddit</span> and the <span className='uppercase'>Alien</span> logo are registered trademarks of reddit inc.
        </p>
    </div>
  )
}

export default NotFound