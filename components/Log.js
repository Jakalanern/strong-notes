import { useEffect, useRef, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'
import Image from 'next/image'
import lightModeLoading from '../gifs/light-loading.gif'
import darkModeLoading from '../gifs/dark-loading.gif'
import { db } from '../firebase/config.mjs'
import { addDoc, collection, getDocs } from 'firebase/firestore'

export default function Log({ darkMode, formValues, setFormValues, goToHome }) {
  const KEY = '$2b$10$/YTrpnNEDPD1tnILOvo7nevaZkaervTQTKKN5kSkd1uz.cFlzLiyK'

  const [exerciseAdded, setExerciseAdded] = useState(false)
  const [workoutCompleted, setWorkoutCompleted] = useState(false)
  const [workoutName, setWorkoutName] = useState('')
  const [workoutSets, setWorkoutSets] = useState('')
  const [workoutReps, setWorkoutReps] = useState('')
  const [workoutWeight, setWorkoutWeight] = useState('')

  const [count, setCount] = useState(0)
  const [workout, setWorkout] = useState([])
  const [newWorkout, setNewWorkout] = useState()
  const [users, setUsers] = useState([])
  const workoutCollectionRef = collection(db, 'workouts')
  const [completed, setCompleted] = useState(false)
  const [sendProgress, setSendProgress] = useState(null)
  const [exerciseAlert, setExerciseAlert] = useState(false)

  const requireExerciseAlert = () => {
    setExerciseAlert(true)
    setTimeout(() => {
      setExerciseAlert(false)
    }, 2500)
  }

  useEffect(() => {
    if (count > 0) {
      setWorkout((prev) => [...prev, newWorkout])
    }
    setCount((prevCount) => prevCount + 1)
  }, [newWorkout])

  const createWorkout = async () => {
    await addDoc(workoutCollectionRef, { workout, dateCreated: new Date() })
    setWorkout([])
    setWorkoutCompleted(true)
    setTimeout(() => {
      setWorkoutCompleted(false)
    }, 500)
  }

  let handleSubmit = (event) => {
    event.preventDefault()
    setNewWorkout({
      name: workoutName,
      sets: workoutSets,
      reps: workoutReps,
      weight: workoutWeight,
    })
    setExerciseAdded(true)
    setTimeout(() => {
      setExerciseAdded(false)
    }, 1500)
    clearInputs()
  }

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

  let clearInputs = () => {
    setWorkoutName('')
    setWorkoutSets('')
    setWorkoutReps('')
    setWorkoutWeight('')
  }

  return (
    <div
      className={`relative overflow-hidden min-h-[87vh] md:min-h-[100vh] w-screen py-12 text-base xs:text-sm md:text-lg lg:text-xl xl:text-2xl ${
        darkMode && 'dark'
      } dark:bg-zinc-900`}>
      {/* {workoutCompleted && (
        <section className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-2 border-zinc-900 dark:border-white w-1/3 h-1/3 bg-white dark:bg-zinc-900 grid items-center  z-50'>
          <h1 className='text-6xl tracking-wider text-center'>
            Workout Saved!
          </h1>
        </section>
        // <h1 className='absolute top-28 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 text-4xl text-center z-50 transition-all flex gap-2'>
        //   Workout Saved! <FaCheck />
        // </h1>
      )} */}
      {exerciseAdded && (
        <h1 className='absolute top-28 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1  text-center z-50 transition-all flex gap-2'>
          Exercise Added! <FaCheck />
        </h1>
      )}
      {exerciseAlert && (
        <h1 className='absolute top-28 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1  text-center z-50 transition-all flex gap-2'>
          Enter an exercise first!
        </h1>
      )}
      <section className=' flex flex-col justify-start items-center gap-10  dark:bg-zinc-900 dark:text-white -translate-y-4 md:translate-y-0 '>
        <h1 className='mt-32   tracking-wider text-center text-5xl md:text-6xl'>
          Log your workout
        </h1>
        <form
          autoComplete='off'
          className='relative bg-neutral p-8 flex flex-col gap-4 items-center border-black border-2 dark:border-white w-[375px] sm:w-auto'
          onSubmit={(e) => {
            handleSubmit(e)
          }}>
          {workoutCompleted && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
              <h1 className='text-4xl tracking-wider text-center whitespace-nowrap'>
                Workout Saved!
              </h1>
            </div>
          )}
          <div
            className='flex justify-start gap-2 text-center tracking-wider'
            style={workoutCompleted ? { opacity: 0 } : { opacity: 1 }}>
            <p className='w-40'>Exercise Name</p>
            <p className='w-12'>Sets</p>
            <p className='w-12'>Reps</p>
            <p className='w-12'>Lbs</p>
          </div>
          <section
            className={`font-["Roboto"] flex flex-row justify-center gap-1.5 sm:gap-2 dark:text-black`}
            style={workoutCompleted ? { opacity: 0 } : { opacity: 1 }}>
            <input
              required
              value={workoutName}
              name='name'
              disabled={completed && true}
              onChange={(e) => {
                setWorkoutName(e.target.value)
              }}
              className={
                completed
                  ? 'outline outline-none w-40 pl-1.5 py-0.5 focus:outline-black focus:outline-2 text-white bg-black dark:bg-neutral-600 rounded-none'
                  : 'outline outline-neutral-700 outline-1 w-40 pl-1.5 py-0.5 focus:outline-black focus:outline-2 rounded-none'
              }
              type='text'
              autoComplete='new-password'
            />
            <input
              required
              value={workoutSets}
              autoComplete='off'
              name='sets'
              disabled={completed && true}
              onChange={(e) => {
                setWorkoutSets(e.target.value)
              }}
              className={
                completed
                  ? `outline outline-none w-12 text-center focus:outline-black focus:outline-2 text-white bg-black dark:bg-neutral-600 rounded-none`
                  : `outline outline-neutral-700 outline-1 w-12 text-center focus:outline-black focus:outline-2 rounded-none`
              }
              type='text'
            />
            <input
              required
              value={workoutReps}
              autoComplete='off'
              name='reps'
              disabled={completed && true}
              onChange={(e) => {
                setWorkoutReps(e.target.value)
              }}
              className={
                completed
                  ? `outline outline-none w-12 text-center focus:outline-black focus:outline-2 text-white bg-black dark:bg-neutral-600 rounded-none`
                  : ` outline outline-neutral-700 outline-1 w-12 text-center focus:outline-black focus:outline-2 rounded-none`
              }
              type='text'
            />
            <input
              required
              value={workoutWeight}
              autoComplete='off'
              name='weight'
              disabled={completed && true}
              onChange={(e) => {
                setWorkoutWeight(e.target.value)
              }}
              className={
                completed
                  ? `outline outline-none w-12 text-center focus:outline-black focus:outline-2 text-white bg-black dark:bg-neutral-600 rounded-none`
                  : `outline outline-neutral-700 outline-1 w-12 text-center focus:outline-black focus:outline-2 rounded-none`
              }
              type='text'
            />
          </section>
          <section className='flex flex-col gap-1 w-[325px]'>
            {workout &&
              workout.map((exercise, index) => {
                return (
                  <ul
                    className='flex justify-start text-start gap-2 tracking-wider text-zinc-400'
                    style={
                      workoutCompleted
                        ? { display: 'none' }
                        : { display: 'flex' }
                    }
                    key={index}>
                    <li className='w-40'>{exercise.name}</li>

                    <li className='w-12 text-center'>{exercise.sets}</li>

                    <li className='w-12 text-center'>{exercise.reps}</li>

                    <li className='w-12 text-center'>{exercise.weight}</li>
                  </ul>
                )
              })}
          </section>
          <button
            style={workoutCompleted ? { opacity: 0 } : { opacity: 1 }}
            type='submit'
            className='bg-black text-white py-1 min-w-[325px] hover:bg-white  hover:text-black hover:outline hover:outline-1 hover:outline-black dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white'>
            ADD EXERCISE
          </button>
          <button
            style={workoutCompleted ? { opacity: 0 } : { opacity: 1 }}
            onClick={(e) => {
              if (newWorkout) {
                createWorkout()
              } else {
                requireExerciseAlert()
              }
            }}
            type='button'
            className='bg-black text-white py-1 min-w-[325px] hover:bg-white  hover:text-black hover:outline hover:outline-1 hover:outline-black dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white'>
            COMPLETE WORKOUT
          </button>
        </form>
      </section>
    </div>
  )
}
