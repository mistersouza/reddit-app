import React, { useEffect } from 'react';
import clsx from 'clsx';

import { RootState } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { Community, joinCommunity, leaveCommunity, setCommunity } from '@/features/communitySlice';
import { openAuthModal } from '@/features/authSlice';
// import Image from 'next/image';

import { PhotoIcon, BellIcon } from '@heroicons/react/20/solid'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/client';

import { doc, increment, writeBatch } from 'firebase/firestore';
import { useFetchCommunitySnippetsQuery } from '@/features/api/apiSlice';

type Props = {
    community: Community;
}

const Header = ({ community: data }: Props) => {
    const { communitySnippets } = useSelector((state: RootState) => state.communityPage);
    const [ user ] = useAuthState(auth);
    
    const isJoined = !user ? false : communitySnippets.some(snippet => snippet.communityName === data.name);
    
    const dispatch = useDispatch();

    const { 
        data: snippets = [],
        isLoading,
        isSuccess,
        isError,
        error        
    } = useFetchCommunitySnippetsQuery(user);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCommunity({ communitySnippets: snippets }));
        }
    }, [isSuccess, snippets, dispatch]);


   const handleJoinCommunity = async (community: Community) => {
        try {
            const batch = writeBatch(firestore);

            const newCommunitySnippet = {
                communityName: community.name,
                imageUrl: community.imageUrl || '',
            };
            batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, community.name), newCommunitySnippet);
            
            batch.update(doc(firestore, `communities/${community.name}`), {
                numberOfMembers: increment(1),
            });

            await batch.commit();

            dispatch(joinCommunity({ newCommunitySnippet }));

        } catch (error) {
            console.log(error);
        }
    }

    const handleLeaveCommunity = async (communityName: string) => {
        try {
            const batch = writeBatch(firestore);
            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName));

            batch.update(doc(firestore, `communities/${communityName}`), {
                numberOfMembers: increment(-1),
            });

            await batch.commit();

            dispatch(leaveCommunity(communityName));
        } catch (error) {
            console.log(error);
        }
    }


    const handleJoinOrLeaveCommunityClick = (info: Community) => {
        if (!user) {
            dispatch(openAuthModal('login'));
            return;
        };

        if (isJoined) {

            handleLeaveCommunity(info.name);
            return;
        }
        
        handleJoinCommunity(info);
    }; 

    const btnClasses = clsx({
        'btn-outline': isJoined,
        'btn-solid': !isJoined,
    });

  return (
    <div className='flex flex-col w-full h-36'>
        <div className='h-1/2 bg-blue-400' />
        <div className='flex justify-center bg-white grow'>
            <div className='flex w-11/12 max-w-screen-md'>
                <div className='flex justify-center items-center overflow-hidden rounded-full bg-blue-400 w-20 h-20 relative -top-4 border-4 border-white'>
                   <PhotoIcon className='text-white' />
                </div>
                <div className='flex pt-3 pl-1 grow justify-between'>
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold'>{data.name}</p>
                        <p className='text-sm text-gray-400 font'>r/{data.name}</p>
                    </div>
                    <div className='self-start flex items-center gap-1.5'>
                        <button 
                            className={`${btnClasses} px-5`}
                            onClick={() => handleJoinOrLeaveCommunityClick(data)}
                        >{isJoined ? 'Joined' : 'Join'}
                        </button>
                        <div className='m-auto p-1 border border-blue-500 rounded-full text-blue-500'>
                            <BellIcon className='h-4.5 w-4' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header