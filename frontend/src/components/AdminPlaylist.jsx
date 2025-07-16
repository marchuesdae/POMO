'use client'
import { useEffect, useState } from 'react'

export default function AdminPlaylist() {
  const [playlist, setPlaylist] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/spotify/admin-playlist') // or change if you're deployed
      .then(res => res.json())
      .then(data => setPlaylist(data))
  }, [])

  if (!playlist) return <p>Loading playlist...</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{playlist.name}</h2>
      <ul>
        {playlist.tracks.items.map((item) => (
          <li key={item.track.id}>
             {item.track.name} – {item.track.artists.map((a) => a.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
} 