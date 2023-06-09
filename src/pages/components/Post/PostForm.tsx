import React, { useState } from 'react'

import { DocumentTextIcon, PhotoIcon, LinkIcon, MicrophoneIcon, ListBulletIcon, ExclamationCircleIcon   } from '@heroicons/react/24/outline'
// import { DocumentTextIcon, PhotoIcon, LinkIcon, MicrophoneIcon, ListBulletIcon   } from '@heroicons/react/24/solid'

import PostTab from './PostTab'
import PostInput from './postForm/PostInput'
import MediaUpload from './postForm/MediaUpload'
import Title from './postForm/Title'
import TagButtons from './postForm/TagButtons'
import { Post } from '@/features/postsSlice'
import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '@/firebase/client'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

import { useCreatePostMutation } from '@/features/api/apiSlice';
import { useUploadImageMutation } from '@/features/api/apiSlice'
import useFile from '@/hooks/useFile'

type Props = {
  user: User;
}

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

function PostForm({ user }: Props) {
  const [ activeTab, setActiveTab ] = useState(tabs[0]); 
  // const [ loading, setLoading ] = useState(false);
  const [ createPost, { data: postRef } ] = useCreatePostMutation();
  const [ uploadImage ] = useUploadImageMutation();
  const { file, handleFileChange, setFile } = useFile();
  const [ form, setForm ] = useState({
    title: '',
    text: '',
  }); 
  
  const router = useRouter();

  const handleFormChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  const handleCreatePost = async() => {
    const { community: communityName } = router.query;
    const { title, text } = form;

    const newPost: Post = {
      communityName,
      authorId: user.uid,
      authorUsername: user.email?.split('@')[0] || 'Anonymous',
      title,
      text,
      numberOfComments: 0,
      numberOfUpvotes: 0,
      createdAt: serverTimestamp(),
    }

    
    // uploadImage(postRef, file);
    
    // createPost(newPost);
    
    try {
      const postRef = await addDoc(collection(firestore, 'posts'), newPost);
      await updateDoc(postRef, { id: postRef.id });
      
      if(file) {
        const imageRef = ref(storage, `posts/${postRef.id}/image`);
        await uploadString(imageRef, file, 'data_url'); 
        
        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(postRef, { imageUrl })
        
      }

    } catch (error) {
      console.log({error});
    }

    router.back(); 
  }

  return (
    <div className='flex flex-col rounded-sm mt-1 bg-white'>
      <div className='flex w-full'>
        {tabs.map(tab => (
          <PostTab key={tab.label} tab={tab} setActiveTab={setActiveTab} active={tab === activeTab} />
        ))}
      </div>
      <div className='flex flex-col w-full p-2.5 gap-2'>
        <Title post={form} handleFormChange={handleFormChange} />
        {activeTab.label === 'Post' && (
          <PostInput 
            post={form}
            handleFormChange={handleFormChange} 
            handleCreatePost={handleCreatePost}
          />
        )}
        {activeTab.label === 'Images & Video' && (
          <MediaUpload 
            file={file}
            setActiveTab={setActiveTab}
            setFile={setFile}
            handleFileChange={handleFileChange}
          />
        )}
        <TagButtons />
      </div>
      <div className='w-full p-3 bg-gray-100 leading-5 text-xs'>
        <div className='flex items-center gap-1'>
          <input 
            type='checkbox'
            checked
          />
          <label>Send me post reply notifications</label>
        </div>
        <a className='text-blue-600 hover:underline'>Connect accounts to share your post</a>
        <ExclamationCircleIcon className='inline-block ml-1 w-4 h-4 text-gray-400'/>
      </div>
    </div>
  )
}

export default PostForm