import React from 'react'

import { RootState } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { Post, setPosts } from '@/features/postsSlice';

const usePosts = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state: RootState) => state.posts);

  return {
    posts,
    setPosts: (posts: Post[]) => dispatch(setPosts(posts)),
  }; 
}; 

export default usePosts;