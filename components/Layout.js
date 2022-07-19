import { Home } from './Home'
import Nav from './Nav'
import Link from 'next/link'
import Log from './Log'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import History from './History'
import { BiBlanket } from 'react-icons/bi'
import Blank from './Blank'

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false)

  const [formValues, setFormValues] = useState([
    {
      name: '',
      sets: '',
      reps: '',
      weight: '',
    },
    {
      name: '',
      sets: '',
      reps: '',
      weight: '',
    },
  ])
  const [showHome, setShowHome] = useState(true)
  const [showLog, setShowLog] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const [showBlank, setShowBlank] = useState(false)

  const goToHome = () => {
    setShowHome(true)
    setShowLog(false)
    setShowHistory(false)
    setShowBlank(false)
  }

  const goToLog = () => {
    setShowLog(true)
    setShowHome(false)
    setShowHistory(false)
    setShowBlank(false)
  }

  const goToHistory = () => {
    setShowHistory(true)
    setShowLog(false)
    setShowHome(false)
    setShowBlank(false)
  }

  const goToBlank = () => {
    setShowBlank(true)
    setShowHome(false)
    setShowLog(false)
    setShowHistory(false)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.querySelector('body').style.background = 'rgb(24,24,27)'
    } else {
      document.querySelector('body').style.background = 'white'
    }
  }, [darkMode])

  return (
    <div className={`${darkMode ? 'dark bg-zinc-900' : 'bg-white'}`}>
      <Nav
        goToHome={goToHome}
        goToLog={goToLog}
        goToHistory={goToHistory}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      {showLog && (
        <Log
          darkMode={darkMode}
          formValues={formValues}
          setFormValues={setFormValues}
          goToHome={goToHome}
        />
      )}
      {showHistory && (
        <History
          darkMode={darkMode}
          formValues={formValues}
          setFormValues={setFormValues}
          goToLog={goToLog}
          goToHistory={goToHistory}
          goToBlank={goToBlank}
        />
      )}
      {showBlank && <Blank darkMode={darkMode} />}
    </div>
  )
}

export default Layout
