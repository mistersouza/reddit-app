import React from 'react'

import { ArrowTrendingUpIcon, ChatBubbleOvalLeftEllipsisIcon, BellAlertIcon, PlusIcon, CurrencyEuroIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'


function Icons() {
  return (
    <div className='flex items-center justify-center mx-2 space-x-2 text-gray-500'>
        <div className='hidden lg:flex lg:items-center space-x-2 px-2 border-r-2 border-gray-200'>
            <div className='flex border-[1.5px] border-gray-500 rounded-full p-0.5'>
                <ArrowTrendingUpIcon className='h-3 w-3' />
            </div>
            <CurrencyEuroIcon className='icon' />
            <SpeakerWaveIcon className='icon' />
        </div>   
        <ChatBubbleOvalLeftEllipsisIcon className='icon' />
        <BellAlertIcon className='icon' />
        <PlusIcon className='icon' />    
    </div>
  )
}

export default Icons