import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import lightModeLoading from '../gifs/light-loading.gif'
import darkModeLoading from '../gifs/dark-loading.gif'

const History = ({ darkMode }) => {
  const [loading, setLoading] = useState(null)
  const [workoutsByDate, setWorkoutsByDate] = useState([])
  const [haveWorkouts, setHaveWorkouts] = useState(false)
  const [fetchComplete, setFetchComplete] = useState(false)
  const [workouts, setWorkouts] = useState([])
  const [binIDS, setBinIDS] = useState([])
  const [binDates, setBinDates] = useState([])

  const KEY = '$2b$10$/YTrpnNEDPD1tnILOvo7nevaZkaervTQTKKN5kSkd1uz.cFlzLiyK'

  const readBin = (binID) => {
    let req = new XMLHttpRequest()

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log('RES', res)
        // const res = JSON.parse(req.responseText)
        // console.log('READ RES', res)
        setWorkouts((prev) => [...prev, res])

        // console.log('SORTED BY DATE', workoutsSortedByDate)
        // workouts.forEach((workout) => console.log(workout))
        setTimeout(() => {
          setLoading(false)
        }, 750)
      }
    }

    req.open('GET', `https://api.jsonbin.io/v3/b/${binID}`, true)
    req.setRequestHeader('X-Master-Key', `${KEY}`)
    req.send()
  }

  useEffect(() => {
    setWorkouts([])
    setLoading(true)
    let req = new XMLHttpRequest()

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        const res = JSON.parse(req.responseText)
        setBinDates(res.map((bin) => bin.createdAt))
        setBinIDS(res.map((bin) => bin.record))
        setFetchComplete(true)
      }
    }

    req.open('GET', 'https://api.jsonbin.io/v3/c/uncategorized/bins', true)
    req.setRequestHeader('X-Master-Key', `${KEY}`)
    req.send()
  }, [])

  useEffect(() => {
    // console.log('binDates: ', binDates)
  }, [binDates])

  useEffect(() => {
    if (workouts.length > 0) {
      setHaveWorkouts(true)
      console.log('WORKOUTS', workouts)
    }
  }, [workouts])

  useEffect(() => {
    if (fetchComplete === true) {
      binIDS.map((binID) => readBin(binID))
      console.log(binIDS)
    }
  }, [fetchComplete])

  return (
    <>
      {loading && (
        <div
          id='wrapper'
          className={` h-screen w-screen grid items-center content-center bg-white dark:bg-zinc-900 ${
            darkMode && 'dark'
          }`}>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100'>
            <Image
              src={darkMode ? darkModeLoading : lightModeLoading}
              alt='Spinning wheel loading'
            />
          </div>
        </div>
      )}

      {!loading && haveWorkouts && (
        <div
          id='wrapper'
          className={`min-h-full w-screen grid items-start content-center bg-white dark:bg-zinc-900 dark:text-white  ${
            darkMode && 'dark'
          }`}>
          <section
            id='cards'
            className=' grid grid-flow-row items-start align-middle gap-y-4 bg-white dark:bg-zinc-900 pt-44 pb-20'>
            {workouts.map((workout) => {
              return (
                <div key={workout.metadata.id}>
                  <Card
                    workout={workout.record}
                    workoutDate={workout.metadata.createdAt}
                    binDates={binDates}
                  />
                </div>
              )
            })}
          </section>
        </div>
      )}
      {!loading && !haveWorkouts && (
        <div
          id='wrapper'
          className={`h-screen w-screen grid items-center content-center bg-white dark:bg-zinc-900 dark:text-white ${
            darkMode && 'dark'
          }`}
          style={{ marginTop: '80px' }}>
          <h1 className='text-4xl md:text-6xl text-center -translate-y-36 px-6'>
            No workouts have been logged yet...
          </h1>
        </div>
      )}
    </>
  )
}

export default History

function Card({ workout, workoutDate }) {
  return (
    <div
      id='card'
      className='card flex flex-col border-black border-2 text-xl sm:text-2xl md:text-4xl p-4 gap-4 w-3/4 mx-auto max-w-3xl dark:text-white dark:border-zinc-600'>
      <h1 className='text-center text-2xl md:text-4xl'>
        Date: {workoutDate.substring(10, -1)}
      </h1>
      <table>
        <thead className='text-xl sm:text-2xl md:text-4xl border-b border-neutral-500'>
          <tr>
            <th className='px-2 pl-0'>Exercise</th>
            <th className='px-2'>Sets</th>
            <th className='px-2'>Reps</th>
            <th className='px-2 pr-0'>Weight</th>
          </tr>
        </thead>
        <tbody>
          {workout.map((w) => {
            return (
              <tr key={workout.length++} id={workout.length++}>
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
  )
}
