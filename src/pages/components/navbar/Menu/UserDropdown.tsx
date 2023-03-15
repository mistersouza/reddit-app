import { RootState } from '@/app/store'
import { useSelector, useDispatch } from 'react-redux'
import { openAuthModal } from '@/features/authSlice'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, CurrencyEuroIcon, MoonIcon, UserIcon, UserCircleIcon, FireIcon } from '@heroicons/react/24/outline'

import { signOut, User as FirebaseUser } from 'firebase/auth'
import { auth } from '../../../../firebase/client'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
    user?: FirebaseUser | null
}

function Dropdown({ user }: Props) {
    const { isOpen, view } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch(); 

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-2 py-1 hover:ring-1 ring-inset ring-gray-200">
          {user
          ? (
            <div className='flex items-center gap-1'>
                <UserCircleIcon className='h-5 w-5 text-gray-400'/>
                <div className='hidden lg:flex flex-col items-start px-0.5'>
                    <p className='text-xs font-semibold'>{user?.displayName || user.email?.split('@'[0])}</p>
                    <div className='flex items-center gap-1'>
                        <FireIcon className='h-3 w-3 text-red-500'/>
                        <p className='text-xs'>1 karma</p>
                    </div>
                </div>
            </div>
          )
          : <UserIcon className='h-5 w-5 text-gray-400'/>
          }
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        {user ? (
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-3">
                    <div className='flex px-3 items-center gap-1 text-gray-400'>
                        <UserCircleIcon className='h-4 w-4'/>
                        <span className='text-sm'>My Stuff</span> 
                    </div>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                            Online Status 
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                            Profile
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                            Style Avatar
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                            User Settings
                        </a>
                    )}
                    </Menu.Item>
                </div>
                <div className="py-1">
                    <div className='flex items-center gap-1 px-3 text-gray-400'>
                        <MoonIcon className='h-4 w-4'/>
                        <span className='text-sm'>View Options</span> 
                    </div>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                        Dark Mode
                        </a>
                    )}
                    </Menu.Item>
                </div>
                <div className="py-1">
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-3 py-2 text-sm'
                        )}
                        >
                            <div className='flex items-center gap-1 text-gray-900'>
                                <CurrencyEuroIcon className='h-5 w-5'/>
                                <div className='flex flex-col'>
                                    <span className='text-sm'>Coins</span>
                                    <p className='text-xs text-gray-700'>0 coins</p>
                                </div>
                            </div>
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                        Add to favorites
                        </a>
                    )}
                    </Menu.Item>
                </div>
                <div className="py-1">
                    <Menu.Item>
                    {({ active }) => (
                        <button
                            className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex gap-2 w-full px-3 py-2 text-left text-sm'
                            )}
                            onClick={() => signOut(auth)}
                            >
                                <ArrowRightOnRectangleIcon className='h-5 w-5 text-gray-700'/>
                                Log Out
                        </button>
                    )}
                    </Menu.Item>
                    <p className='text-xs mx-3 text-gray-400 my-5'>
                        © 2023 Reddit, Inc. All Rights Reserved
                    </p>
                </div>
            </Menu.Items>
        ) : (
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-3">
                    <div className='flex px-3 items-center gap-1 text-gray-400'>
                        <UserCircleIcon className='h-4 w-4'/>
                        <span className='text-sm'>My Stuff</span> 
                    </div>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                            Online Status 
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                            Profile
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                            Style Avatar
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                            User Settings
                        </a>
                    )}
                    </Menu.Item>
                </div>
                <div className="py-1">
                    <div className='flex items-center gap-1 px-3 text-gray-400'>
                        <MoonIcon className='h-4 w-4'/>
                        <span className='text-sm'>View Options</span> 
                    </div>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                        Dark Mode
                        </a>
                    )}
                    </Menu.Item>
                </div>
                <div className="py-1">
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-3 py-2 text-sm'
                        )}
                        >
                            <div className='flex items-center gap-1 text-gray-900'>
                                <CurrencyEuroIcon className='h-5 w-5'/>
                                <div className='flex flex-col'>
                                    <span className='text-sm'>Coins</span>
                                    <p className='text-xs text-gray-700'>0 coins</p>
                                </div>
                            </div>
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-7 py-2 text-sm'
                        )}
                        >
                        Add to favorites
                        </a>
                    )}
                    </Menu.Item>
                </div>
                <div className="py-1">
                    <Menu.Item>
                    {({ active }) => (
                        <button
                            className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex gap-2 w-full px-3 py-2 text-left text-sm'
                            )}
                            onClick={() => dispatch(openAuthModal('login'))}
                            >
                                <ArrowLeftOnRectangleIcon className='h-5 w-5 text-gray-700'/>
                                Log in / Sign Up
                        </button>
                    )}
                    </Menu.Item>
                    <p className='text-xs mx-3 text-gray-400 my-5'>
                        © 2023 Reddit, Inc. All Rights Reserved
                    </p>
                </div>
            </Menu.Items>
        )}
      </Transition>
    </Menu>
  )
}

export default Dropdown