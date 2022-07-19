import { useEffect, useRef, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import useStorage from '../hooks/useStorage'
import Image from 'next/image'
import lightModeLoading from '../gifs/light-loading.gif'
import darkModeLoading from '../gifs/dark-loading.gif'

export default function Log({ darkMode, dontShowLog }) {
  const KEY = '$2b$10$/YTrpnNEDPD1tnILOvo7nevaZkaervTQTKKN5kSkd1uz.cFlzLiyK'
  const [thisWorkoutData, setThisWorkoutData] = useState([])
  const [sendProgress, setSendProgress] = useState(null)
  const [submitCount, setSubmitCount] = useState(1)
  const [isReadOnly, setIsReadOnly] = useState(true)
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

  const [completed, setCompleted] = useState(false)

  let handleChange = (i, e) => {
    let newFormValues = [...formValues]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        name: '',
        sets: '',
        reps: '',
        weight: '',
      },
    ])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues]
    newFormValues.splice(i, 1)
    setFormValues(newFormValues)
  }

  let handleSubmit = (event) => {
    event.preventDefault()
    setSubmitCount((prevCount) => prevCount + 1)
    // Create a bin with the information at jsonbin.io
    // setThisWorkoutData((prev) => [
    //   ...prev,
    //   {
    //     dateCreated: new Date().toLocaleDateStrong('en-US'),
    //     id: Math.random(),
    //     workout: formValues,
    //   },
    // ])
    createBin('New Workout', JSON.stringify(formValues))
    // CLEAR THE FORM
    clearForm()
  }

  // useEffect(() => {
  //   if (thisWorkoutData.length > 0) {
  //     console.log('CREATED BIN')
  //     createBin(`New Workout`, JSON.stringify(thisWorkoutData))
  //   }
  // }, [thisWorkoutData])

  let clearForm = () => {
    let newFormValues = [...formValues]
    newFormValues.map((ele) => {
      ele.name = ''
      ele.sets = ''
      ele.reps = ''
      ele.weight = ''
    })
    setFormValues(newFormValues)
  }

  const updateBin = (key) => {
    let req = new XMLHttpRequest()

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText)
      }
    }

    req.open(
      'PUT',
      'https://api.jsonbin.io/v3/b/62ce21d64d5b061b1b4b26eb',
      true
    )
    req.setRequestHeader('Content-Type', 'application/json')
    req.setRequestHeader('X-Master-Key', `${KEY}`)
    req.send(data)
  }

  const createBin = (name, data, user) => {
    setSendProgress('Sending')
    if (user) {
      if (typeof user === 'string') {
        user = user.toLowerCase()
      }
    }

    let req = new XMLHttpRequest()

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        setSendProgress('Sent')
        setTimeout(() => {
          setSendProgress(null)
        }, 2500)
        console.log(req.responseText)
      }
    }

    req.open('POST', 'https://api.jsonbin.io/v3/b', true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.setRequestHeader('X-Master-Key', `${KEY}`)
    if (user === 'jack' || user === 'me') {
      req.setRequestHeader('X-Collection-Id', '62cefe844d5b061b1b4c90d8')
    }
    req.setRequestHeader('X-Bin-Name', `${name}`)
    req.send(data)
  }

  const createCollection = (name) => {
    let req = new XMLHttpRequest()

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText)
      }
    }

    req.open('POST', 'https://api.jsonbin.io/v3/c', true)
    req.setRequestHeader('X-Collection-Name', `${name}`)
    req.setRequestHeader('X-Master-Key', `${KEY}`)
    req.send()
  }
  let count = 1

  return (
    <div className={`h-screen w-screen overflow-hidden ${darkMode && 'dark'}`}>
      {sendProgress === 'Sent' && (
        <h1 className='absolute top-28 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 text-4xl text-center z-50 transition-all'>
          Workout Saved
        </h1>
      )}
      <section className='h-full flex flex-col justify-center items-center gap-10 md:scale-125 xl:scale-150 dark:bg-zinc-900 dark:text-white'>
        <h1 className='mt-20  text-5xl tracking-wider text-center scale-90 sm:scale-100'>
          Log your workout
        </h1>
        <form
          autoComplete='off'
          className='bg-neutral p-8 flex flex-col gap-4 border-black border-2 dark:border-white scale-90 sm:scale-100'
          onSubmit={(e) => {
            handleSubmit(e)
          }}>
          {sendProgress === 'Sending' && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100'>
              <Image
                src={darkMode ? darkModeLoading : lightModeLoading}
                alt='Spinning wheel loading'
              />
            </div>
          )}
          <div
            className='flex justify-start gap-2 text-center tracking-wider'
            style={
              sendProgress === 'Sending' ? { opacity: 0 } : { opacity: 1 }
            }>
            <p className='w-40'>Exercise Name</p>
            <p className='w-12'>Sets</p>
            <p className='w-12'>Reps</p>
            <p className='w-12'>Lbs</p>
          </div>
          {formValues.map((element, index) => (
            <section
              className={`font-["Roboto"] flex flex-row justify-center gap-1.5 sm:gap-2 dark:text-black`}
              style={
                sendProgress === 'Sending' ? { opacity: 0 } : { opacity: 1 }
              }
              key={index}>
              <input
                required
                value={element.name || ''}
                name='name'
                disabled={completed && true}
                onChange={(e) => handleChange(index, e)}
                className={
                  completed
                    ? 'outline outline-none w-40 pl-1.5 py-0.5 focus:outline-black focus:outline-2 text-white bg-black dark:bg-neutral-600 '
                    : 'outline outline-neutral-700 outline-1 w-40 pl-1.5 py-0.5 focus:outline-black focus:outline-2'
                }
                type='text'
                autoComplete='new-password'
              />
              <input
                required
                autoComplete='off'
                value={element.sets || ''}
                name='sets'
                disabled={completed && true}
                onChange={(e) => handleChange(index, e)}
                className={
                  completed
                    ? `outline outline-none w-12 text-center focus:outline-black focus:outline-2 text-white bg-black dark:bg-neutral-600 `
                    : `outline outline-neutral-700 outline-1 w-12 text-center focus:outline-black focus:outline-2`
                }
                type='text'
              />
              <input
                required
                autoComplete='off'
                value={element.reps || ''}
                name='reps'
                disabled={completed && true}
                onChange={(e) => handleChange(index, e)}
                className={
                  completed
                    ? `outline outline-none w-12 text-center focus:outline-black focus:outline-2 text-white bg-black dark:bg-neutral-600 `
                    : ` outline outline-neutral-700 outline-1 w-12 text-center focus:outline-black focus:outline-2`
                }
                type='text'
              />
              <input
                required
                autoComplete='off'
                value={element.weight || ''}
                name='weight'
                disabled={completed && true}
                onChange={(e) => handleChange(index, e)}
                className={
                  completed
                    ? `outline outline-none w-12 text-center focus:outline-black focus:outline-2 text-white bg-black dark:bg-neutral-600 `
                    : `outline outline-neutral-700 outline-1 w-12 text-center focus:outline-black focus:outline-2`
                }
                type='text'
              />
              <button
                style={
                  sendProgress === 'Sending' ? { opacity: 0 } : { opacity: 1 }
                }
                type='button'
                className='h-min dark:text-white'
                onClick={() => {
                  removeFormFields(index)
                }}>
                <AiFillDelete className='translate-y-1.5 ml-1 fixed' />
              </button>
            </section>
          ))}
          <button
            style={sendProgress === 'Sending' ? { opacity: 0 } : { opacity: 1 }}
            type='button'
            className='bg-black text-white py-1 text-xs hover:bg-white  hover:text-black hover:outline hover:outline-1 hover:outline-black dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white'
            onClick={() => {
              addFormFields()
            }}>
            Add Row
          </button>
          <button
            style={sendProgress === 'Sending' ? { opacity: 0 } : { opacity: 1 }}
            type='submit'
            className='bg-black text-white py-1 hover:bg-white  hover:text-black hover:outline hover:outline-1 hover:outline-black dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white'>
            SAVE WORKOUT
          </button>
        </form>
        <button
          className='bg-black py-1 px-5 text-white hover:bg-white  hover:text-black hover:outline hover:outline-1 hover:outline-black w-max mb-6 dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white'
          type='button'
          onClick={() => {
            fetchUnorderedBins()
          }}>
          Go Back
        </button>
      </section>
    </div>
  )
}
