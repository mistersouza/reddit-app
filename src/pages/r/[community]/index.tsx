import React, { useEffect } from 'react'

import { GetServerSidePropsContext } from 'next'

import { doc, getDoc } from 'firebase/firestore'; 
import { firestore } from '../../../firebase/client'; 

import { Community, setCommunity } from '@/features/communitySlice';
import NotFound from '@/pages/components/community/NotFound';
import Header from '@/pages/components/community/Header';
import PageLayout from '@/pages/components/layout/PageLayout';
import CreatePost from '@/pages/components/community/CreatePost';
import Feed from '@/pages/components/Post/Feed';
import { useDispatch } from 'react-redux';
import About from '@/pages/components/community/About';

type Props = {
    community: Community;
    message?: string; 
}

const CommunityPage = ({ community: data }: Props) => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(setCommunity({ currentCommunity: data }));
    }, [data, dispatch]);
    
    if (!data) return <NotFound error='Sorry, there aren&#39;t any communities on Reddit with that name.'/>; 

    return (
        <div className='w-full'>
            <Header community={data} />
            <PageLayout>
                <div>
                    <CreatePost />
                    <Feed community={data} />
                </div>
                <div>
                    <About community={data} />
                </div>
            </PageLayout>
        </div>
    ) 
  
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query } = context;
    const { community } = query as { community: string };

    try {
        const communityDocRef = doc(firestore, 'communities', community);
        const communityDoc = await getDoc(communityDocRef);

        if (!communityDoc.exists()) {
            return {
                props: {
                    community: null,
                }
            }
        }

        return {
            props: {
                community: JSON.parse(JSON.stringify(communityDoc.data())),
            },
        };
    } catch (error) {
        /* return {
            redirect: {
                destination: '/login',
                statusCode: 307
            }
        } */
        // note to self: dev custom error page
        console.log({error});
    }
};


export default CommunityPage