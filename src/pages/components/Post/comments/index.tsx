import React, { useEffect, useState } from 'react'


import { Comment } from '@/features/commentsSlice'
import { Post } from '@/features/postsSlice'
import { User } from 'firebase/auth'

import CommentInput from './CommentInput'

import { useCreateCommentMutation } from '@/features/api/apiSlice'
import { serverTimestamp, Timestamp } from 'firebase/firestore'

type Props = {
    user: User
    post: Post
}

const Comments = ({ user, post }: Props) => {
    const [ comment, setComment ] = useState<string>('')
    const [ comments, setComments ] = useState<Comment[]>([]); 

    const [ createComment ] = useCreateCommentMutation();
    
    const handleCreateComment = (comment: string) => {
        // set new comment
        const newComment: Comment = {
            postTitle: post.title!,
            createdBy: user.uid,
            creatorDisplayName: user.email!.split('@')[0],
            communityName: post.communityName!,
            content: comment,
            postId: post.id!,
            createdAt: serverTimestamp() as Timestamp,
        }
        createComment(newComment);

        setComment('');
        setComments([...comments, newComment]);
    }

    const handleDeleteComment = (comment: Comment) => {}

    const handleEditComment = (comment: Comment) => {}

    useEffect(() => {
        // fetch comments
    }, []); 

  return (
    <div className='rounded-r-sm bg-white py-3'>
        <div className='w-full flex justify-end'>
            <CommentInput comment={comment} setComment={setComment} user={user} post={post} onComment={handleCreateComment} />
        </div>
    </div>
  )
}

export default Comments