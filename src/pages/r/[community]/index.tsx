import React from 'react'

import { GetServerSidePropsContext } from 'next'

import { doc, getDoc } from 'firebase/firestore'; 
import { firestore } from '../../../firebase/client'; 

import { CommunityPageState } from '@/features/communityPageSlice';
import NotFound from '@/pages/components/community/NotFound';
import Header from '@/pages/components/community/Header';
import PageLayout from '@/pages/components/layout/PageLayout';
import CreatePost from '@/pages/components/community/CreatePost';

type Props = {
    communityData: CommunityPageState;
    message?: string; 
}

const CommunityPage = ({ communityData: data }: Props) => {

    if (!data) return <NotFound error='Sorry, there aren&#39;t any communities on Reddit with that name.'/>; 

    return (
        <div className='w-full'>
            <Header communityData={data} />
            <PageLayout>
                <div>
                    <CreatePost />
                </div>
                <div>Right content</div>
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
                    communityData: null,
                }
            }
        }

        return {
            props: {
                communityData: JSON.parse(JSON.stringify(communityDoc.data())),
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