import React, { useState, useEffect } from 'react'
import { parseYouTubeUrl } from '../utils/youtube'

export default function VideoForm({ onSave, initial }) {
  const [url, setUrl] = useState(initial?.url || '')
  const [title, setTitle] = useState(initial?.title || '')
  const [error, setError] = useState('')

  useEffect(() => {
    setUrl(initial?.url || '')
    setTitle(initial?.title || '')
  }, [initial])

  function handleSubmit(e) {
    e.preventDefault()
    const id = parseYouTubeUrl(url)
    if (!id) {
      setError('Please enter a valid YouTube link or ID.')
      return
    }
    setError('')
    onSave({ id, url: url.trim(), title: title.trim() })
    setUrl('')
    setTitle('')
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">Add / Edit Video</h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">YouTube link or ID</label>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Title (optional)</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Video title shown on site"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex flex-wrap gap-3 mt-2">
        <button 
          type="submit" 
          className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Save
        </button>
        <button 
          type="button" 
          onClick={() => { setUrl(''); setTitle(''); setError('') }} 
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Clear
        </button>
      </div>
    </form>
  )
}
