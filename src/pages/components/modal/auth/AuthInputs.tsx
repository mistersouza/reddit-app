import React from 'react'

import { RootState } from '@/app/store'
import { useSelector } from 'react-redux'


import Login from './Login'
import Signup from './Signup'

type Props = {}

const AuthInputs = (props: Props) => {
    const { view } = useSelector((state: RootState) => state.auth)

  return (
    <div className='flex flex-col items-center w-full mt-4'>
        { view === 'login' && <Login /> }
        { view === 'signup' && <Signup /> }
    </div>
  )
}

export default AuthInputs