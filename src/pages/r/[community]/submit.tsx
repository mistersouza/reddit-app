import PageLayout from '@/pages/components/layout/PageLayout'
import PostForm from '@/pages/components/Post/PostForm'
import React from 'react'

type Props = {}

const Submit = (props: Props) => {
  return (
    <PageLayout>
      <>
        <div className='border-b border-white py-3.5'>
          <p>Create a post</p>
        </div>
        <PostForm />
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