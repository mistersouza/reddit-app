import React from 'react'
import { User as firebaseUser } from 'firebase/auth'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type Props = {
  user?: firebaseUser | null; 
}

const SearchInput = (props: Props) => {
  return (
    <form className='flex flex-1 items-center self-center space-x-2 py-1 px-3 bg-gray-100 border border-transparent rounded-full lg:max-w-[600px] hover:border-blue-500' >
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400'/>
        <input
            className='w-full bg-transparent outline-none text-sm placeholder:text-sm'
            type='text'                                                                                                                                                                                                                                                                                                                                                            
            placeholder='Search Reddit'
        /> 
        <button type='submit' hidden />
    </form>
  )
}

export default SearchInput