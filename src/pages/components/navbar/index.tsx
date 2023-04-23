import { useState } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/client'

import MenuOptions from './Menu'
import SearchInput from './SearchInput'
import HomeDropdown from './HomeDropdown/index'
import CommunityModal from '../modal/community'
import Image from 'next/image'

type Props = {
  images: [{
    id: string,
    url: string,
  }]; 
}

const Navbar = () => {

  const [ user, loading, error ] = useAuthState(auth); 

  return (
    <div className='sticky top-0 flex h-11 px-1 gap-1 items-center justify-between bg-slate-50 lg:px-2 lg:py-2.5 lg:gap-2'>
      <div className='flex items-center'>
        <div className='relative h-8 w-10'>
          <Image 
            src='https://res.cloudinary.com/dhlhrakma/image/upload/v1680168856/redditFace_hugvxs.svg'
            fill
            style={{ objectFit: 'contain' }}
            alt='Reddit Logo'
          />
        </div>
        <div className='relative h-11 w-20'>
          <Image
            src='https://res.cloudinary.com/dhlhrakma/image/upload/v1680168820/redditText_wrhcmf.svg'
            fill
            style={{ objectFit: 'cover' }}
            alt='Reddit Logo'
          />
        </div>
      </div>
        <CommunityModal />
        { user && <HomeDropdown /> }
        <SearchInput user={user} />
        <MenuOptions user={user} />
    </div>
  )
}

export default Navbar

export async function getStaticProps() {
  const results = await fetch(`curl https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`).toString('base64')}`
    }
  }).then(response => response.json());

  console.log('results', results)

  const { resources } = results;
  const images = resources.map((resource: any) => {
    return {
      id: resource.asset_id,
      url: resource.secure_url
    }
  });

  return {
    props: {
      images
    }
  }; 
}; 