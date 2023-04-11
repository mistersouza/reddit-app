import React from 'react'


import { AdjustmentsHorizontalIcon, ChevronDownIcon, EllipsisHorizontalIcon, FireIcon, NewspaperIcon, SparklesIcon } from '@heroicons/react/24/outline'

const PostMenu = () => {
  return (
    <div className='flex mb-2 border border-gray-300 rounded-md px-1.5 pt-1 pb-1.5 items-center justify-between text-xs font-semibold text-gray-500'>
        <div className='flex item-center cursor-pointer'>
            <div className='flex items-center py-1 px-1.5 gap-1 hover:bg-gray-100 rounded-full'>
                <FireIcon className='h-5 w-5 text-gray-400'/>
                <p>Hot</p>
            </div>
            <div className='flex items-center px-2 gap-1 hover:bg-gray-100 rounded-full'>
                <NewspaperIcon className='h-4.5 w-3.5 text-gray-400' />
                <p>New</p>
            </div>
            <div className='flex items-center px-2 gap-1 hover:bg-gray-100 rounded-full'>
                <SparklesIcon className='h-4.5 w-3.5 text-gray-400' />
                <p>Top</p>
            </div>
            <div className='flex items-center px-2 hover:bg-gray-100 rounded-full'>
                <EllipsisHorizontalIcon className='w-5 text-gray-400' />
            </div>
        </div>
        <div className='flex items-center py-1.5 px-2 hover:bg-gray-100 rounded-full'>
            <AdjustmentsHorizontalIcon className='w-5 text-gray-400'/>
            <ChevronDownIcon className='w-4 text-gray-400'/>
        </div>
    </div>
  )
}

export default PostMenu