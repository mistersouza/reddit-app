import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode[]
}

function PageLayout({ children }: Props) {
    const [leftContent, rightContent ] = children;


  return (
    <div className='flex justify-center py-4'>
        <div className='flex justify-center w-11/12 max-w-screen-sm gap-2'>
            <div className='flex flex-col w-full md:w-8/12'>{leftContent}</div>
            <div className='hidden md:flex flex-col grow'>{rightContent}</div>
        </div>
    </div>
  )
}

export default PageLayout