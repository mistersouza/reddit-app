import React from 'react'

import { ArrowDownCircleIcon, ArrowUpCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
type Props = {}

function PostHeader({
}: Props) {
  return (
    <div className='flex w-7/12 h-10 mx-auto py-1.5 bg-black opacity-90 justify-center'>
        <div className='flex w-4/5 px-2 text-slate-100 text-xs font-[400] items-center justify-start gap-1'>
            <div className='border-l border-gray-600 pl-2'>
                <ArrowUpCircleIcon className='w-5 h-7' />
            </div>
            <p>Vote</p>
            <div className='border-r border-gray-600 pr-2'>
                <ArrowDownCircleIcon className='w-5 h-7' />
            </div>
            <div className='flex items-center px-5 gap-2'>
                <p>Title</p>
                <div className='rounded-lg px-2 bg-red-800 text-[.6rem] text-white'>Video</div>
                
            </div>
            <div className='flex items-center ml-auto cursor-pointer'>
                <XMarkIcon className='w-5 h-7' />
                <p>Close</p>
            </div>
        </div>
    </div>
  )
}

export default PostHeader