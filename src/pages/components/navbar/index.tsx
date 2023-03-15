import { useState } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/client'

import MenuOptions from './Menu'
import SearchInput from './SearchInput'
import HomeDropdown from './HomeDropdown/index'
import CommunityModal from '../modal/community'

// type Props = {}

const Navbar = () => {
  const [ user, loading, error ] = useAuthState(auth); 

  return (
    <div className='flex h-11 px-1 gap-1 items-center justify-between  lg:px-2 lg:py-2.5 lg:gap-2'>
      <div className='flex items-center'>
        <img 
          className='h-8'
          src='images/redditFace.svg'
        />
        <img
          className='hidden md:inline-block h-11'
          src='images/redditText.svg'
        />
      </div>
        <CommunityModal />
        { user && <HomeDropdown /> }
        <SearchInput user={user} />
        <MenuOptions user={user} />
    </div>
  )
}

export default Navbar