import React, { useState } from 'react'

import { DocumentTextIcon, PhotoIcon, LinkIcon, MicrophoneIcon, ListBulletIcon   } from '@heroicons/react/24/outline'
// import { DocumentTextIcon, PhotoIcon, LinkIcon, MicrophoneIcon, ListBulletIcon   } from '@heroicons/react/24/solid'

import PostTab from './PostTab'
import PostInput from './postForm/PostInput'

type Props = {}

export type Tab = {
  label: string;
  // implement active state
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const tabs: Tab[] = [
  {
    label: 'Post',
    Icon: DocumentTextIcon,
  },
  {
    label: 'Images & Video',
    Icon: PhotoIcon,
  },
  {
    label: 'Link',
    Icon: LinkIcon,
  },
  {
    label: 'Poll',
    Icon: ListBulletIcon,
  },
  {
    label: 'Talk',
    Icon: MicrophoneIcon,
  },
]; 

function PostForm({}: Props) {
  const [ activeTab, setActiveTab ] = useState(tabs[0]); 
  const [ loading, setLoading ] = useState(false);
  const [ form, setForm ] = useState({
    title: '',
    text: '',
  }); 

  const [ media, setMedia ] = useState<string>('');

  const handleFormChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  const handleCreatePost = () => {
    console.log('create post')
  }

  return (
    <div className='flex flex-col rounded-sm mt-1 bg-white'>
      <div className='flex w-full'>
        {tabs.map((tab, index) => (
          <PostTab key={index} tab={tab} setActiveTab={setActiveTab} active={tab === activeTab} />
        ))}
      </div>
      <div className='flex'>
        {activeTab.label === 'Post' && (
          <PostInput 
          post={form} 
          handleFormChange={handleFormChange} 
          handleCreatePost={handleCreatePost}
          />
        )}
      </div>
    </div>
  )
}

export default PostForm