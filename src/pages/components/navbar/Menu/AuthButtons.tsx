import React from 'react'
import { QrCodeIcon } from '@heroicons/react/24/outline'

import { useDispatch } from 'react-redux'
import { openAuthModal } from '@/features/authSlice'

// import { signIn } from 'next-auth/react'

const AuthButtons = () => {

  const dispatch = useDispatch()

  return (
    <div className='hidden md:flex items-center space-x-2 p-2'>
      <button
        type='button'
        className='flex items-center justify-center space-x-2
        +
         md:w-18 lg:w-28 btn-outline'
        onClick={() => dispatch(openAuthModal('login'))}
      >
        <QrCodeIcon className='h-5 w-5'/>
        <span>Get App</span>
      </button>
      <button
        type='button'
        className='md:w-18 lg:w-28 btn-solid'
      onClick={() => dispatch(openAuthModal('signup'))}
      >Sign Up</button>
    </div>
  )
}

export default AuthButtons