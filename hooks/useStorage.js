import { useState, useEffect } from 'react'
import { projectStorage } from '../firebase/config.mjs'

const useStorage = (data) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    const storageRef = projectStorage.ref(data.name)

    storageRef.put(data).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
        setProgress(percentage)
      },
      (err) => {
        setError(err)
      },
      async () => {
        const url = await storageRef.getDownloadURL()
        setUrl(url)
      }
    )
  }, [data])

  return { progress, url, error }
}

export default useStorage
