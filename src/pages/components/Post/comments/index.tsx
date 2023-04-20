import React, { useEffect, useState } from 'react'


import { Comment } from '@/features/commentsSlice'
import { Post, setPost } from '@/features/postsSlice'
import { User } from 'firebase/auth'

import { useDispatch } from 'react-redux'
import Input from './Input'


import { useCreateCommentMutation, useFetchCommentsQuery } from '@/features/api/apiSlice'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import Card from './Card'

type Props = {
    user: User;
    post: Post
}

const Comments = ({ user, post }: Props) => {
    const [ comment, setComment ] = useState<string>('')
    const [ comments, setComments ] = useState<Comment[]>([]); 

    const dispatch = useDispatch();

    const [ createComment ] = useCreateCommentMutation();
    const [ deleteComment ] = useCreateCommentMutation();

    const { data, isLoading, error } = useFetchCommentsQuery(post);



    console.log('data', data)

    useEffect(() => {
        if (data) {
            setComments(data as Comment[]);
        }
    }, [data])

    console.log(comments)

    
    const handleCreateComment = (comment: string) => {
        // set new comment
        const newComment: Comment = {
            postTitle: post.title!,
            createdBy: user!.uid,
            creatorDisplayName: user!.email!.split('@')[0],
            communityName: post.communityName!,
            content: comment,
            postId: post.id!,
            createdAt: serverTimestamp() as Timestamp,
        }
        createComment(newComment);

        setComment('');
        setComments([...comments, newComment]);

        // update post
        dispatch(setPost({
            ...post,
            numberOfComments: post.numberOfComments! + 1
        }))
    }

    const handleDeleteComment = (comment: Comment) => {
        deleteComment(comment);
        setComments(comments.filter(cmmnt => cmmnt.id !== comment.id));
       
        // update post
        dispatch(setPost({
            ...post,
            numberOfComments: post.numberOfComments! - 1
        }))
    }

    const handleEditComment = (comment: Comment) => {}

    useEffect(() => {
        // fetch comments
    }, []); 

    console.log('comments', comments)

  return (
    <div className='rounded-r-sm bg-white py-3 space-y-3'>
        <div className='w-full flex justify-center'>
            <Input comment={comment} setComment={setComment} user={user} post={post} onComment={handleCreateComment} />
        </div>
        <div className='flex flex-col'>
            {!comments.length && <div className='text-center text-gray-500 border border-gray-100 p-20'>No comments yet</div>}
            {comments.map((comment: Comment) => (
                <div className='w-full' key={comment.id}>
                    <Card comment={comment} onDelete={handleDeleteComment}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Comments