import React from 'react'

import PageLayout from '@/pages/components/layout/PageLayout'
import PostForm from '@/pages/components/Post/PostForm'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/client'


import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import About from '@/pages/components/community/About'

const Submit = () => {
  const [ user ] = useAuthState(auth)
  const { currentCommunity: data } = useSelector((state: RootState) => state.communityPage);
  
  
  return (
    <PageLayout>
      <>
        <div className='border-b border-white py-3.5 pr-3 flex items-center justify-between'>
          <p>Create a post</p>
          <p className='text-[0.6rem] uppercase font-semibold text-blue-500'>Drafts<span className='w-1 h-1 ml-1 p-0.5 bg-gray-500 text-white'>0</span></p>
        </div>
        {user && <PostForm user={user} />}
      </>
      <>
        <>
          {data && <About community={data} />}
        </>
      </>
    </PageLayout>
  )
}

export default Submit