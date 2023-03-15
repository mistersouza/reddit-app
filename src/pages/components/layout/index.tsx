import React, { ReactNode } from 'react'
import Navbar from '../navbar'




type Props = {
    children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
        <Navbar />
        <main>{children}</main>
    </>
  )
}

export default Layout