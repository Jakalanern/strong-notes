import React from 'react'
import lightModeLoading from '../gifs/light-loading.gif'
import darkModeLoading from '../gifs/dark-loading.gif'
import Image from 'next/dist/client/image'

const Blank = ({ darkMode }) => {
  return (
    <div className='h-screen w-1/4 mx-auto bg-white dark:bg-zinc-900 grid items-center'>
      {darkMode ? (
        <Image
          src={darkModeLoading}
          alt='loading spinner'
          className='min-w-[150px]'
        />
      ) : (
        <Image
          src={lightModeLoading}
          alt='loading spinner'
          className='min-w-[150px]'
        />
      )}
    </div>
  )
}

export default Blank
