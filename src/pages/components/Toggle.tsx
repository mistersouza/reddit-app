import React from 'react'

type Props = {}

const Toggle = () => {
  return (
    <label 
      htmlFor="toggle"
      className="bg-gray-200 relative inline-flex flex-shrink-0 h-5 w-8 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-blue-500"
      >
      <span className="sr-only">Set community theme</span>
    {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
     <span 
        aria-hidden="true" 
        className="translate-x-0 inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 pointer-events-none"></span>
      <input type="checkbox" id="toggle" className="absolute inset-0 sr-only" />
  </label>
  )
}

export default Toggle