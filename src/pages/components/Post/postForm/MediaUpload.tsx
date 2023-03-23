import Image from 'next/image';
import React from 'react'

import { Tab } from '../PostForm';

type Props = {
  media?: string;
  setActiveTab: (tab: Tab) => void;
  setMedia: (file: string) => void;
  handleMediaUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MediaUpload({ media, setActiveTab, setMedia, handleMediaUpload }: Props) {
  return (
    <div className='relative w-full h-64 overflow-hidden'>
      {media ? (
        <Image
          src={media}
          fill
          objectFit='cover'
          alt='Post media'
        />
      ) : (
         <div className='flex h-64 border border-dashed border-gray-200 items-center justify-center gap-1'>
          <p className='text-sm text-blue-900 font-light'>Drag and drop images or</p>
          <button className='btn-outline'>
              <label htmlFor='upload'>Upload</label>
              <input
                id='upload'
                type='file'
                className='hidden'
                onChange={handleMediaUpload}
              />
          </button>
      </div>
      )}
    </div>
  )
}

export default MediaUpload