import React from 'react'

import { PlayIcon, PhotoIcon, TableCellsIcon, LinkIcon, ShieldExclamationIcon, ListBulletIcon, TagIcon, PlusIcon } from '@heroicons/react/24/outline'

type Props = {
  post: {
    title: string
    text: string
  };
  handleCreatePost: () => void;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function PostInput({ post, handleCreatePost, handleFormChange }: Props) {
  return (
    <div className='flex flex-col w-full p-2.5 gap-2'>
      <div className='flex border border-gray-100 rounded-sm items-center justify-between'>
        <input 
          className='grow outline-0 px-3 py-1.5 text-sm font-light focus:ring-1 ring-blue-400 rounded-sm'
          type='text'
          name='title'
          value={post?.title}
          onChange={handleFormChange}
          placeholder='Title'
        />  
        <p className='px-2 text-[.6rem] text-gray-400 font-semibold'>0/300</p>
      </div>
      <div>
        <div className='border border-red-500 rounded-sm'>
          <div className='flex w-full items-center justify-start gap-3 bg-gray-100 text-gray-500'>
            <div className='flex pl-3 py-2 gap-2'>
              <LinkIcon className='h-4 w-4.5' />
              <ShieldExclamationIcon className='h-4 w-4.5' />
            </div>
            <div className='flex pl-3 py-2 gap-2 border-l border-l-gray-200'>
              <ListBulletIcon className='h-4 w-4.5' />
            </div>
            <div className='flex pl-3 py-2 gap-2 border-l border-l-gray-200'>
              <TableCellsIcon className='h-4 w-4.5'/>
              <PhotoIcon className='h-4 w-4.5' />
              <PlayIcon className='h-4 w-4.5' />
            </div>
            <p className='ml-auto leading-3 text-center text-[.6rem] text-blue-900 font-semibold w-14'>Markdown Mode</p>
          </div>
          <textarea 
            className='w-full h-32 outline-0 px-3 py-1.5 resize-y text-sm font-light'
            name='text'
            value={post?.text}
            onChange={handleFormChange}
            placeholder='Text (required)'
          />
        </div>
        <p className='py-1 text-[.6rem] text-red-500'>This community requires body text.</p>
      </div>
      <div className='flex gap-1'>
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
      <div className='flex flex-col'>
        <div className='flex w-full border-t border-t-gray-200 pt-2.5 justify-end'>
          <button className='btn-outline'>Save Draft</button>
          <button 
            className='btn-solid' 
            type='submit'
            disabled={!post?.title}
            onClick={handleCreatePost}
          >Post</button>
        </div>
        <p className='py-1 text-right text-[.6rem] text-red-500'>Please fix the above requirements</p>
      </div>
    </div>
  )
}

export default PostInput