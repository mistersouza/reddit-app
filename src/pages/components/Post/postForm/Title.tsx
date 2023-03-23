import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

type Props = {
    post: {
        title: string
        text: string
    };
    handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Title = ({ post, handleFormChange }: Props) => {
    const [focus, setFocus] = React.useState(false); 
    const inputRef = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        if (inputRef.current) {
        inputRef.current.addEventListener('focus', () => setFocus(true))
        }
        inputRef.current?.addEventListener('blur', () => setFocus(false))
    }, [])
  
    const focusClasses = clsx({
    'ring-1 ring-blue-400': focus,
    })
    
    return (
        <div 
            className={`flex border border-gray-100 rounded-sm items-center justify-between ${focusClasses}`}
            onClick={() => inputRef.current?.focus()}
        >
            <input 
            className='grow outline-0 px-3 py-1.5 text-sm font-light rounded-sm'
            type='text'
            name='title'
            ref={inputRef}
            value={post?.title}
            onChange={handleFormChange}
            placeholder='Title'
            />  
            <p className='px-2 text-[.6rem] text-gray-400 font-semibold'>0/300</p>
        </div>
    )
}

export default Title