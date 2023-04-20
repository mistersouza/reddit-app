import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon, BookmarkIcon, FlagIcon, BellIcon, GiftIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

import { Comment } from '@/features/commentsSlice'
import { User } from 'firebase/auth'

function classNames(...classes) {
  return classes.
  filter(Boolean).join(' ')
}

type Props = {
    comment: Comment;
    user: User | null | undefined;
    onDelete: (comment: Comment) => void;
}

export default function Dropdown({ comment, user }: Props) {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-sm bg-white px-2 py-0.5 text-sm font-semibold text-gray-900 shadow-sm  ring-gray-300 hover:bg-gray-100">
          <EllipsisHorizontalIcon  className='w-5 h-5' aria-hidden="true"/>
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs font-medium">
            {user?.uid !== comment.createdBy && ( 
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-blue-50 text-gray-700' : ' text-gray-500',
                    'flex w-full items-center px-3 py-2'
                  )}
                >
                  <GiftIcon className='w-5 h-5 mr-1.5' aria-hidden="true"/> 
                  <p>Give Award</p>
                </button>
              )}
            </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-blue-50 text-gray-700' : ' text-gray-500',
                    'flex w-full items-center px-3 py-2'
                  )}
                >
                  <BookmarkIcon className='w-5 h-5 mr-1.5' aria-hidden="true"/> 
                  <p>Save</p>
                </button>
              )}
            </Menu.Item>
            {user?.uid === comment.createdBy && (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-blue-50 text-gray-700' : ' text-gray-500',
                    'flex w-full items-center px-3 py-2'
                  )}
                >
                  <PencilIcon className='w-5 h-5 mr-1.5' aria-hidden="true"/> 
                  <p>Edit</p>
                </button>
              )}
            </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-blue-50 text-gray-700' : ' text-gray-500',
                    'flex w-full items-center px-3 py-2'
                  )}
                >
                  <BellIcon className='w-5 h-5 mr-1.5' aria-hidden="true"/>
                  Follow
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-blue-50 text-gray-700' : ' text-gray-500',
                    'flex w-full items-center px-3 py-2'
                  )}
                >
                  <FlagIcon className='w-5 h-5 mr-1.5' aria-hidden="true"/>
                  Report
                </button>
              )}
            </Menu.Item>
            {user?.uid === comment.createdBy && ( 
            <>
                <Menu.Item>
                {({ active }) => (
                    <button
                    className={classNames(
                        active ? 'bg-blue-50 text-gray-700' : ' text-gray-500',
                        'flex w-full items-center px-3 py-2 capitalize'
                    )}
                    onClick={() => onDelete(comment)}
                    >
                    <TrashIcon className='w-5 h-5 mr-1.5' aria-hidden="true"/> 
                    <p>Delete comment</p>
                    </button>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <form className={classNames(
                        active ? 'bg-blue-50 text-gray-700' : ' text-gray-500',
                        'flex w-full items-center px-3 py-2 capitalize'
                    )}>
                        <input className='w-4 h-5 mr-1.5' type="checkbox" checked />
                        <label>Send me reply notifications</label>
                    </form>
                )}
                </Menu.Item>
            </>
            )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
