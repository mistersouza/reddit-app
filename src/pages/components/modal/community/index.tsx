import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserIcon, EyeIcon, EyeSlashIcon  } from '@heroicons/react/20/solid'

import { RootState } from '@/app/store'
import { useSelector, useDispatch } from 'react-redux'
import { closeCommunityModal } from '@/features/communityModalSlice'

import { doc, runTransaction, serverTimestamp  } from 'firebase/firestore'
import { auth, firestore } from '@/firebase/client'

import { useAuthState } from 'react-firebase-hooks/auth'



type Props = {
}

function CommunityModal({}: Props) {
  const [ communityName, setCommunityName ] = useState('')
  const [ communityType, setCommunityType ] = useState('public')
  const [ charactersRemaining, setCharactersRemaining ] = useState(21)
  const [ error, setError ] = useState(''); 

  const [ user, loading ] = useAuthState(auth); 

  const { isOpen } = useSelector((state: RootState) => state.communityModal); 
  const dispatch = useDispatch()
  
  const cancelButtonRef = useRef(null)

  const handleCommunityNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target; 

    if (value.length > 21) return;

    setCommunityName(value)
    setCharactersRemaining(21 - value.length)
  }

  const handleCommunityTypeChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCommunityType(value)
  }; 

  const  handleCreateCommunity =  async() => {
    // Community name validation. Special characters, min length, and max length
    
    const CommunityNameFormat = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    
    if (CommunityNameFormat.test(communityName)) {
      setError('Community names cannot contain special characters')
      return;
    }

    if (communityName.length < 3) {
      setError('Community names must be at least 3 characters long')
      return;
    }

    if (communityName.length > 21) {
      setError('Community names must be less than 21 characters long')
      return;
    }

    
    try {
      // verify community name is not taken
      const communityDocRef = doc(firestore, 'communities', communityName); 

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, the community name r/${communityName} is already taken. Please try another name.`);
        }
        // create community doc
        transaction.set(communityDocRef, {
          createdBy: user?.uid,
          createdAt: serverTimestamp(),
          name: communityName,
          members: [user?.uid],
          communityType,
        });

        // create communitySnippets doc
        transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
          communityName,
          isModerator: true,
        });

      });
  

      dispatch(closeCommunityModal());

    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(''), 5000); 
    }

  }



  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeCommunityModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-3 sm:pb-4">
                  <XMarkIcon
                      className="absolute top-3 right-4 h-5 w-5 text-gray-400 cursor-pointer"
                      type='button'
                      onClick={() => dispatch(closeCommunityModal())}
                      />
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-base border-b border-gray-200 pb-4 leading-6 text-gray-900">
                        Create a community
                      </Dialog.Title>
                      <div>
                        <form className='px-0 py-3'>
                          <div>
                            <label
                              htmlFor='community-name'
                            >
                              <span>Name</span>
                              <p className='flex items-center gap-1 text-xs text-gray-400'>
                                <span>Community names including capitalization cannot be changed.</span>
                                <ShieldExclamationIcon className='w-3.5 h-3.5' />
                              </p>
                            </label>
                            <div className='mb-4'>
                              <p className='relative top-7 text-sm text-gray-400 ml-1.5'>r/</p>
                              <input 
                                className='relative top-0.5 bg-transparent w-full mb-2 px-4 leading-8 text-sm ring-1 ring-inset ring-gray-200 rounded-sm' 
                                type="text"
                                id='community-name' 
                                maxLength={21}
                                name='community-name'
                                value={communityName}
                                onChange={handleCommunityNameChange}
                              />
                              <p 
                                className={`text-xs ${charactersRemaining === 0 ? 'text-red-500' : 'text-gray-400'}`}
                              >
                                {charactersRemaining} {charactersRemaining > 1 ? 'characters' : 'character'} remaining
                              </p>
                              <p className={`text-[.6rem] text-red-500 ${error ? 'visible' : 'invisible'}`}>{communityName && error}</p>
                            </div>
                          </div>
                          <fieldset className='mb-4 space-y-2'>
                            <legend>Community type</legend>
                            <div className='flex items-center gap-1'>
                              <input 
                                className='w-3.5 h-3.5' 
                                id='public' 
                                type='radio' 
                                name='community-type' 
                                value='public'
                                checked={communityType === 'public'}
                                onChange={handleCommunityTypeChange}
                              />
                              <UserIcon className='w-4 h-4 text-gray-400' />
                              <label
                                className='text-sm'
                                htmlFor='public'>Public</label>
                              <p className='text-[.6rem] text-gray-500'>Anyone can view, post, and comment to this community</p>
                            </div>
                            <div className='flex items-center gap-1'>
                              <input
                                className='w-3.5 h-3.5'
                                id='restricted' 
                                type='radio' 
                                name='community-type' 
                                value='restricted'
                                checked={communityType === 'restricted'}
                                onChange={handleCommunityTypeChange}
                              />
                              <EyeIcon className='w-4 h-4 text-gray-400' />
                              <label
                                className='text-sm'
                                htmlFor='restricted'>Restricted</label>
                              <p className='text-[.6rem] text-gray-500'>Anyone can view this community, but only approved users can post</p>
                            </div>
                            <div className='flex items-center gap-1'>
                              <input
                                className='w-3.5 h-3.5' 
                                id='private' 
                                type='radio' 
                                name='community-type'
                                value='private'
                                checked={communityType === 'private'}
                                onChange={handleCommunityTypeChange}
                              />
                              <EyeSlashIcon className='w-4 h-4 text-gray-400' />
                              <label
                                className='text-sm'
                                htmlFor='private'>Private</label>
                              <p className='text-[.6rem] text-gray-500'>Only approved users can view and submit to this community</p>
                            </div>
                          </fieldset>
                          <fieldset className='space-y-2'>
                            <legend>Adult content</legend>
                            <div className='flex items-center gap-1'>
                              <input
                                className='w-4 h-4'
                                id='adult-content' 
                                type='checkbox' 
                                name='adult-content' />
                              <span className='py-0.25 px-1 rounded-sm text-[0.6rem] text-white uppercase bg-red-500'>Nsfw</span>
                              <label className='text-sm'>18+ year old community</label>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className='btn-solid'
                    onClick={handleCreateCommunity}
                  >
                    {loading 
                      ? <span>
                          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                          </svg>
                        </span>
                      : <span>Create community</span>}
                  </button>
                  <button
                    type="button"
                    className='btn-outline'
                    onClick={() => dispatch(closeCommunityModal())}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CommunityModal