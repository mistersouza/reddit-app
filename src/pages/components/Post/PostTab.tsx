import React from 'react'
import clsx from 'clsx'

import { Tab } from './PostForm';

type Props = {
    tab: Tab;
    active: boolean;
    setActiveTab: (tab: Tab) => void;
}


function PostTab({ tab, active, setActiveTab }: Props) {
  const { label, Icon } = tab;

  const tabClasses = clsx({
    'text-gray-500 border': !active,
    'text-blue-500 border-b-2 border-b-blue-500': active,
  });

  return (
    <div
      className={`flex items-center justify-center grow py-3.5 space-x-2 cursor-pointer text-xs font-semibold border-gray-100 hover:bg-blue-50 ${tabClasses}`}
      onClick={() => setActiveTab(tab)}
    >
      <div className='flex'>
        <Icon className='w-5 h-5' />
      </div>
      <p>{label}</p>
    </div>
  )
}

export default PostTab