import { useState } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/client'

import MenuOptions from './Menu'
import SearchInput from './SearchInput'
import HomeDropdown from './HomeDropdown/index'
import CommunityModal from '../modal/community'
import Image from 'next/image'

// type Props = {}

const Navbar = () => {
  const [ user, loading, error ] = useAuthState(auth); 

  return (
    <div className='flex h-11 px-1 gap-1 items-center justify-between  lg:px-2 lg:py-2.5 lg:gap-2'>
      <div className='flex items-center'>
        <div className='relative h-8 w-10'>
          <Image 
            src='images/redditFace.svg'
            fill
            style={{ objectFit: 'contain' }}
            alt='Reddit Logo'
          />
        </div>
        <div className='relative h-11 w-20'>
          <Image
            src='images/redditText.svg'
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