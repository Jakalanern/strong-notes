import React from 'react'
export function Home({ goToLog, goToHistory }) {
  return (
    <div className='h-full w-full grid place-items-center dark:bg-zinc-900'>
      <div className='flex flex-col gap-12'>
        <button
          className=' py-3 px-5 text-3xl bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white hover:outline hover:outline-2 hover:outline-black '
          onClick={() => {
            goToLog()
          }}>
          Log A Workout
        </button>
        <button
          className=' py-3 px-5 text-3xl bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white hover:outline hover:outline-2 hover:outline-black '
          onClick={() => {
            goToHistory()
          }}>
          View Workout History
        </button>
      </div>
    </div>
  )
}
