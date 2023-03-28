import React from 'react'

import { Community } from '@/features/communitySlice';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';

type Props = {
    community: Community;
}

function About({ community: data }: Props) {

    const getBirthDate = (seconds: number) => {
        const event =  new Date(seconds * 1000);
        return event.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }; 

  return (
    <div className='stick top=[]'>
        <div className='flex items-center justify-between bg-blue-500 p-3 rounded-sm text-xs text-white font-[600]'>
            <h3>About community</h3>
            <EllipsisHorizontalIcon className='w-5 h-5'/>
        </div>
        <div className='flex flex-col gap-3 border-b border-gray-200 p-3 bg-white leading-5 text-xs'>
            <p>A casa dos brasileiros no Reddit. Leia as regras e participe de nossa comunidade! The Brazilian community on Reddit. Feel free to post in English or Portuguese!</p>
            <div className='flex items-center justify-start gap-1'>
                <BuildingStorefrontIcon className='w-5 h-5 text-gray-800' />
                <p className='text-gray-500'>Created {getBirthDate(data.createdAt!.seconds)}</p>
            </div>
        </div>
        <div className='flex justify-evenly border-b border-gray-200 p-3 bg-white text-xs font-medium'>
            <div>
                <h2 className='text-sm'>{data.numberOfMembers.toLocaleString()}</h2>
                <p className='text-gray-500'>Members</p>
            </div>
            <div>
                <h2 className='text-sm'><span className='inline-block w-2 h-2 rounded-full bg-green-300 mr-0.5'></span>1</h2>
                <p className='text-gray-500'>Online</p>
            </div>
        </div>
        <div className='border-b border-gray-200 py-3 bg-white'>
            <Link href='/r/[community]/submit' as={`/r/${data.name}/submit`}>
                <button className='btn-solid w-full'>Create Post</button>
            </Link>
        </div>
    </div>
  )
}

export default About