import { Fragment, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { RootState } from '@/app/store'
import { useSelector, useDispatch } from 'react-redux'
import { closeAuthModal } from '@/features/authSlice'

import AuthInputs from './AuthInputs'
import OAuthButtons from './OAuthButtons'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../firebase/client'
import ResetPassword from './ResetPassword'

const AuthModal = () => {
  const { isOpen, view } = useSelector((state: RootState) => state.auth)
  
  const [user, loading, error] = useAuthState(auth); 
  const dispatch = useDispatch()
  
  if (user) dispatch(closeAuthModal())

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => dispatch(closeAuthModal)}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs">
                <div className='flex justify-end h-5 mt-2 mr-2'>
                  <XMarkIcon 
                    type='button'
                    onClick={() => dispatch(closeAuthModal())}
                  />
                </div>
                <div className="bg-white px-4 pt-5 pb-10 sm:p-6 sm:pb-4">
                  <Dialog.Title as="h3" className="text-left font-semibold leading-6 text-gray-900">
                        { view === 'login' && 'Log In' }
                        { view === 'signup' && 'Sign Up' }
                        { view === 'forgotPassword' && 'Forgot Password' }
                  </Dialog.Title>
                  { view === 'forgotPassword' && <p className='text-xs text-left'>Tell us the email address associated with your Reddit account, and we’ll send you an email with your username.</p>}
                  { view === 'login' || view === 'signup' && <p className='text-xs text-left'>By continuing, you agree are setting up a Reddit account and agree to our <span className='text-blue-600'>User Agreement </span>and <span className='text-blue-600'>Privacy Policy</span>.</p>}
                </div>
                <div className='flex items-center justify-center pb-5'>
                  <div className='flex flex-col items-center justify-center space-y-2 w-3/4'> 
                        <OAuthButtons />
                        <p className='m-0 uppercase text-gray-500'>Or</p>
                        <AuthInputs />
                      {/* <ResetPassword /> */}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AuthModal 