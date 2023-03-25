import React, { useState } from 'react'

import { CommunityPageState } from '@/features/communityPageSlice';
import { useFetchCommunityPostsQuery } from '@/features/api/apiSlice';

type Props = {
    community: CommunityPageState;
}

function Feed({ community }: Props) {

    const {
        data: posts = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useFetchCommunityPostsQuery(community.name);
    
    console.log(posts, isLoading, isSuccess, isError, error);
  return (
    <div>Feed</div>
  )
}

export default Feed