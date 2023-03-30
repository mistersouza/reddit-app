import React from 'react'

import { PlayIcon, PhotoIcon, TableCellsIcon, LinkIcon, ShieldExclamationIcon, ListBulletIcon, TagIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';

type Props = {
  post: {
    title: string
    text: string
  };
  handleCreatePost: () => void;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function PostInput({ post, handleCreatePost, handleFormChange }: Props) {
  
  const errorClasses = clsx({
    'visible': !post.text,
    'invisible': post.text,
  })

  return (
    <div className='flex flex-col'>
      <div>
        <div className='border rounded-sm border-gray-100'>
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
        <p className={`${errorClasses} py-1 text-[.6rem] text-red-500`}>This community requires body text.</p>
      </div>
      <div className='flex flex-col'>
        <div className='flex w-full justify-end pt-2'>
          <button className='btn-outline'>Save Draft</button>
          <button 
            className='btn-solid' 
            type='submit'
            disabled={!post.title}
            onClick={handleCreatePost}
          >
            {'' ? ( 
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 m-auto text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg> 
            ):(
              'Post'
            )}
          </button>
        </div>
        <p className={`pt-1 text-right text-[.6rem] text-red-500 ${errorClasses}`}>Please fix the above requirements</p>
      </div>
    </div>
  )
}

export default PostInput