import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import lightModeLoading from '../gifs/light-loading.gif'
import darkModeLoading from '../gifs/dark-loading.gif'
import { db } from '../firebase/config.mjs'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore'
import { RiEdit2Fill } from 'react-icons/ri'
import { RiDeleteBin2Fill } from 'react-icons/ri'

const History = ({
  darkMode,
  formValues,
  setFormValues,
  goToLog,
  goToHistory,
  goToBlank,
}) => {
  const [workouts, setWorkouts] = useState([])
  const [componentKey, setComponentKey] = useState(0)
  const [requestCount, setRequestCount] = useState(0)
  const [loading, setLoading] = useState(null)
  const [workoutsByDate, setWorkoutsByDate] = useState([])
  const [haveWorkouts, setHaveWorkouts] = useState()
  const [fetchComplete, setFetchComplete] = useState(false)
  const [binIDS, setBinIDS] = useState([])
  const [binDates, setBinDates] = useState([])
  const KEY = '$2b$10$/YTrpnNEDPD1tnILOvo7nevaZkaervTQTKKN5kSkd1uz.cFlzLiyK'

  let beginningDate = Date.now() - 604800000
  let beginningDateObject = new Date(beginningDate)
  const workoutCollectionRef = collection(db, 'workouts')
  const q = query(workoutCollectionRef, orderBy('dateCreated'))

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await getDocs(q)
      setWorkouts(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).reverse()
      )
      if (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length > 0) {
        setHaveWorkouts(true)
      } else {
        setHaveWorkouts(false)
      }
    }
    getWorkouts()
  }, [])

  return (
    <div
      className={` bg-white  pb-8 ${
        darkMode && 'dark bg-zinc-900 text-white'
      } `}>
      {componentKey === 0 && (
        <div
          id='wrapper'
          className={` bg-white  pb-8 ${
            darkMode && 'dark bg-zinc-900 text-white'
          } `}>
          {haveWorkouts && (
            <>
              <h1 className=' text-5xl tracking-wider text-center pb-8 lg:pb-16 pt-28 lg:pt-40 lg:scale-125'>
                Workout History
              </h1>
              <section id='cards' className=' bg-white dark:bg-zinc-900'>
                {workouts.map((workout, i) => {
                  return (
                    <Card
                      workout={workout}
                      key={workout.id}
                      i={i}
                      goToLog={goToLog}
                      goToHistory={goToHistory}
                      componentKey={componentKey}
                      setComponentKey={setComponentKey}
                      goToBlank={goToBlank}
                    />
                  )
                })}
              </section>
            </>
          )}
          {haveWorkouts === false && (
            <h1 className='text-3xl md:text-5xl xl:text-7xl text-center'>
              No workouts here.
            </h1>
          )}
        </div>
      )}
    </div>
  )
}

export default History

function Card({ workout, i, goToLog, goToHistory, goToBlank }) {
  const [workoutDeleted, setWorkoutDeleted] = useState(false)

  const deleteWorkout = async (id) => {
    const workoutDoc = doc(db, 'workouts', id)
    await deleteDoc(workoutDoc)
    goToBlank()
    setTimeout(() => {
      goToHistory()
    }, 250)
  }
  return (
    <div className='flex flex-col justify-between gap-12'>
      <div
        key={i}
        id='card'
        className='relative card flex flex-col gap-4 border-black border-2 text-xl sm:text-2xl md:text-4xl p-4 w-3/4 mx-auto max-w-3xl dark:text-white dark:border-zinc-600 mb-8'>
        <section className='flex justify-between'>
          <h1 className='text-center text-lg md:text-2xl'>
            {workout.dateCreated.toDate().toDateString()} @{' '}
            {workout.dateCreated.toDate().toTimeString().slice(0, 5)}
          </h1>
          <div className=' flex gap-2 md:gap-4'>
            <button
              className='h-max text-[12px] md:text-sm rounded-md py-1 px-1 md:py-2 md:px-2 bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white hover:outline hover:outline-2 hover:outline-black '
              onClick={() => {}}>
              <RiEdit2Fill />
            </button>
            <button
              className='h-max text-[12px] md:text-sm rounded-md py-1 px-1 md:py-2 md:px-2 bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:outline-white hover:outline hover:outline-2 hover:outline-black '
              onClick={() => {
                deleteWorkout(workout.id)
              }}>
              <RiDeleteBin2Fill />
            </button>
          </div>
        </section>
        <table>
          <thead className='text-xl sm:text-2xl md:text-4xl border-b border-neutral-500 tracking-wider'>
            <tr>
              <th className='px-2 pl-0'>Exercise</th>
              <th className='px-2'>Sets</th>
              <th className='px-2'>Reps</th>
              <th className='px-2 pr-0'>Weight</th>
            </tr>
          </thead>
          <tbody>
            {workout.workout.map((w, index) => {
              return (
                <tr key={index}>
                  <td className='py-2 text-center'>{w.name}</td>
                  <td className='py-2 text-center'>{w.sets}</td>
                  <td className='py-2 text-center'>{w.reps}</td>
                  <td className='py-2 text-center'>{w.weight}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
