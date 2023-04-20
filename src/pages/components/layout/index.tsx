import React, { ReactNode } from 'react'

import Navbar from '../navbar'




type Props = {
    children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className='h-full bg-gray-200'>
        <Navbar />
        <main>{children}</main>
    </div>
  )
}

export default Layout