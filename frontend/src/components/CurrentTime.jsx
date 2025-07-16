'use client'

import { useEffect, useState } from 'react'

const CurrentTime = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const timeString = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg text-center">
        <div className="font-mono text-4xl font-bold text-gray-900">
            {timeString}
        </div>
        <div className="text-sm text-gray-600">
            {dateString}
        </div>
    </div>
  )
}

export default CurrentTime 