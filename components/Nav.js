import React, { useState } from 'react'
import { BiNote } from 'react-icons/bi'
import { BiHistory } from 'react-icons/bi'
import { MdDarkMode } from 'react-icons/md'
import { CgSun } from 'react-icons/cg'

const Nav = ({ goToHome, goToLog, goToHistory, toggleDarkMode, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const openDropdown = () => {
    setIsOpen(true)
  }
  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <nav className='fixed top-0 w-full flex flex-row items-center justify-end py-4 px-6 pt-12 -translate-y-8 text-black dark:text-white z-40 bg-white dark:bg-zinc-900 shadow-lg'>
      <h1
        className='text-4xl md:text-5xl xl:text-6xl whitespace-nowrap cursor-pointer'
        onClick={() => {
          goToLog()
        }}>
        Strong Notes
      </h1>
      <ul className='text-3xl xl:text-4xl hidden sm:flex flex-row gap-4 ml-auto'>
        <li
          className='hover:cursor-pointer hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white px-2 py-0.5 flex gap-1 items-center'
          onClick={() => {
            goToLog()
          }}>
          Log Workout <BiNote />
        </li>
        <li
          className='hover:cursor-pointer hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white px-2 py-0.5 flex gap-1 items-center'
          onClick={() => {
            goToHistory()
          }}>
          History <BiHistory className='' />
        </li>
      </ul>
      <button
        className={`ml-auto sm:ml-5 mr-5 sm:mr-0 xl:scale-125 xl:ml-8 bg-black text-white p-1.5 rounded-full dark:bg-white dark:text-black`}
        onClick={() => {
          toggleDarkMode()
        }}>
        {darkMode ? <CgSun /> : <MdDarkMode />}
      </button>
      <div
        id='burger'
        className='flex sm:hidden flex-col gap-1.5 h-full w-10 hover:cursor-pointer'
        onClick={openDropdown}>
        <div className='w-full h-1 bg-black dark:bg-white'></div>
        <div className='w-full h-1 bg-black dark:bg-white'></div>
        <div className='w-full h-1 bg-black dark:bg-white'></div>
      </div>
      {isOpen && (
        <MobileNav
          goToHome={goToHome}
          goToLog={goToLog}
          goToHistory={goToHistory}
          closeDropdown={closeDropdown}
        />
      )}
    </nav>
  )
}

const MobileNav = ({ goToHome, goToLog, goToHistory, closeDropdown }) => {
  return (
    <nav className='fixed top-0 right-0 bottom-0 left-0 bg-white dark:bg-zinc-900 w-screen h-screen overflow-hidden flex flex-col px-9 py-12 text-center text-black dark:text-white'>
      <div
        id='burger'
        className=' ml-auto scale-x-150 text-3xl cursor-pointer pl-2 pt-0.5'
        onClick={closeDropdown}>
        X
      </div>
      <ul className='text-5xl grid place-items-cente gap-8 mx-auto my-auto -translate-y-10'>
        <li
          className='hover:cursor-pointer hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white px-2 py-1'
          onClick={() => {
            goToLog()
            closeDropdown()
          }}>
          Log Workout
        </li>
        <li
          className='hover:cursor-pointer hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white px-2 py-1'
          onClick={() => {
            goToHistory()
            closeDropdown()
          }}>
          History
        </li>
      </ul>
    </nav>
  )
}

export default Nav
