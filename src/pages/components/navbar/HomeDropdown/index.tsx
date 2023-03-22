import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon, HomeIcon } from '@heroicons/react/20/solid'
import { ArrowRightOnRectangleIcon, CurrencyEuroIcon, MoonIcon, SpeakerWaveIcon, PlusIcon, ArrowTrendingUpIcon, ChartBarIcon } from '@heroicons/react/24/outline'

import { useDispatch } from 'react-redux'
import { openCommunityModal } from '@/features/communityModalSlice'

import { User as FirebaseUser } from 'firebase/auth'

type Props = {
    user?: FirebaseUser | null
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function HomeDropdown({ user }: Props) {
    const [ isOpen, setOpen ] = useState(false)

    const dispatch = useDispatch()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-between rounded-md bg-white px-2 py-1.5 lg:w-56 hover:ring-1 ring-inset ring-gray-200 text-gray-800'">
            <div className='flex items-center gap-1'>
                <HomeIcon className='h-5 w-5' />
                <p className='m-0 hidden lg:inline-block text-xs'>Home</p>
            </div>
          <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
            <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-3">
                    <div className='flex px-3 items-center gap-1 text-gray-400'>
                        <span className='text-[.55rem] uppercase'>Your communities</span> 
                    </div>
                    <Menu.Item>
                    {({ active }) => (
                        <button
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'flex items-center w-full gap-0.5 px-2 py-2 text-left text-xs capitalize'
                            )}
                            onClick={() => dispatch(openCommunityModal())}
                        >
                            <PlusIcon className='h-5 w-5'/>
                            <p className='m-0'>Create community</p> 
                        </button>
                    )}
                    </Menu.Item>
                     <div className='flex px-3 items-center gap-1 text-gray-400'>
                        <span className='text-[.55rem] uppercase'>Feeds</span> 
                    </div>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex items-center w-full gap-0.5 px-2 py-2 text-left text-xs capitalize'
                        )}
                        >
                            <HomeIcon className='h-4 w-4'/>
                            <p className='m-0'>Home</p>
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex items-center w-full gap-0.5 px-2 py-2 text-left text-xs capitalize'
                        )}
                        >
                            <div className='flex border-[1.5px] border-gray-500 rounded-full p-0.25'>
                                <ArrowTrendingUpIcon className='h-3 w-3' />
                            </div>
                            <p className='m-0'>Popular</p>
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex items-center w-full gap-0.5 px-2 py-2 text-left text-xs capitalize'
                        )}
                        >
                            <ChartBarIcon className='h-4 w-4'/>
                            <p className='m-0'>All</p>
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex items-center w-full gap-0.5 px-2 py-2 text-left text-xs capitalize'
                        )}
                        >
                            <SpeakerWaveIcon className='h-4 w-4'/>
                            <p className='m-0'>Happening now</p>
                        </a>
                    )}
                    </Menu.Item>
                    <div className='flex px-3 items-center gap-1 text-gray-400'>
                        <span className='text-[.55rem] uppercase'>Others</span> 
                    </div>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex items-center w-full gap-0.5 px-2 py-2 text-left text-xs capitalize'
                        )}
                        >
                            <CurrencyEuroIcon className='h-4 w-4'/>
                            <p className='m-0'>Coins</p>
                        </a>
                    )}
                    </Menu.Item>
                </div>
            </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default HomeDropdown