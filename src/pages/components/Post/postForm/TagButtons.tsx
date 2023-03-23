import React from 'react'
import { PlusIcon, TagIcon } from '@heroicons/react/24/outline'

const TagButtons = () => {
  return (
    <div className='flex border-b border-b-gray-200 pb-3 gap-1'>
        <button 
          className='flex gap-1 uppercase btn-outline'
        >
          <PlusIcon className='h-4 w-4.5' />
          Oc
        </button>
        <button 
          className='flex gap-1 btn-outline'
        >
          <PlusIcon className='h-4 w-4.5' />
          Spoiler
        </button>
        <button 
          className='flex gap-1 uppercase btn-outline'
        >
          <PlusIcon className='h-4 w-4.5' />
          Nsfw
        </button>
        <button 
          className='flex gap-1 btn-outline'
        >
          <TagIcon className='h-4 w-4.5' />
          Flair
        </button>
      </div>
  )
}

export default TagButtons