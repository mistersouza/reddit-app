import Image from 'next/image';
import React from 'react'

import { Tab } from '../PostForm';

type Props = {
  file?: string;
  setActiveTab: (tab: Tab) => void;
  setFile: (file: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MediaUpload({ file, setActiveTab, setFile, handleFileChange }: Props) {
  return (
    <div className='relative w-full h-64 overflow-hidden'>
      {file ? (
        <Image
          src={file}
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
                onChange={handleFileChange}
              />
          </button>
      </div>
      )}
    </div>
  )
}

export default MediaUpload