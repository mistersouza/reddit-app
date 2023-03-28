import React from 'react'

import PageLayout from '@/pages/components/layout/PageLayout'
import PostForm from '@/pages/components/Post/PostForm'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/client'


import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const Submit = () => {
  const [ user ] = useAuthState(auth)
  const { currentCommunity } = useSelector((state: RootState) => state.communityPage);
  
  
  return (
    <PageLayout>
      <>
        <div className='border-b border-white py-3.5'>
          <p>Create a post</p>
        </div>
        { user && <PostForm user={user} /> }
      </>
      <>
        <div>
          {/* <CommunitySidebar /> */}
        </div>
      </>
    </PageLayout>
  )
}

export default Submit