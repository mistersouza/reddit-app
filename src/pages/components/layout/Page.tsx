import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode[]
}

function Page({ children }: Props) {
  const [ leftContent, rightContent ] = children;

  return (
    <div className='w-[55rem] max-w-[calc(100%_-_1rem)] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3'>
      <div className='col-span-2'>{leftContent}</div>
      <div>{rightContent}</div>
    </div>
  )
}

export default Page