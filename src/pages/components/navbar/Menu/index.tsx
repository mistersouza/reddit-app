import React from 'react'

import AuthModal from '../../modal/auth'
import AuthButtons from './AuthButtons'

import { User as FirebaseUser } from 'firebase/auth'

import Icons from './Icons'
import UserDropdown from './UserDropdown'

type Props = {
  user?: FirebaseUser | null
}

const MenuOptions = ({ user }: Props) => {
  
  return (
    <div className='flex items-center justify-end'>
      <AuthModal />
      {user ? <Icons /> : <AuthButtons />}
      <UserDropdown user={user}/>
    </div>
  )
}

export default MenuOptions