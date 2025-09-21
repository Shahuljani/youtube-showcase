// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react'
import VideoForm from '../components/VideoForm'
import { parseYouTubeUrl, thumbnailUrl } from '../utils/youtube'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { db } from '../firebase'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

const ADMIN_CREDENTIALS = {
  username: 'mahesh',
  password: 'yoursmaheshyt@gmail.com'
}

export default function Admin() {
  const [videos, setVideos] = useState([])
  const [editing, setEditing] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [inputUsername, setInputUsername] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  // Fetch videos from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'videos'), snapshot => {
      const vids = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setVideos(vids)
    })
    return () => unsubscribe()
  }, [])

  // Disable right-click
  useEffect(() => {
    const handleContextMenu = e => e.preventDefault()
    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  const handleLogin = e => {
    e.preventDefault()
    if (inputUsername === ADMIN_CREDENTIALS.username && inputPassword === ADMIN_CREDENTIALS.password) {
      setAuthenticated(true)
    } else {
      alert('Incorrect username or password!')
      setInputPassword('')
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={inputUsername}
            onChange={e => setInputUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChange={e => setInputPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
            Login
          </button>
        </form>
      </div>
    )
  }

  // Save or update video in Firestore
  async function handleSave(videoData) {
    try {
      if (editing) {
        const docRef = doc(db, 'videos', editing.id)
        await updateDoc(docRef, { title: videoData.title, url: videoData.url })
        setEditing(null)
        return
      }

      const existing = videos.find(v => v.id === videoData.id)
      if (existing) {
        const docRef = doc(db, 'videos', existing.id)
        await updateDoc(docRef, { title: videoData.title, url: videoData.url })
        return
      }

      await addDoc(collection(db, 'videos'), { id: videoData.id, title: videoData.title, url: videoData.url })
    } catch (err) {
      console.error(err)
    }
  }

  // Delete video from Firestore
  async function handleDelete(id) {
    try {
      const docRef = doc(db, 'videos', id)
      await deleteDoc(docRef)
    } catch (err) {
      console.error(err)
    }
  }

  function handleEdit(id) {
    const v = videos.find(x => x.id === id)
    if (v) setEditing(v)
  }

  // Drag and drop reorder (updates Firestore in order)
  async function onDragEnd(result) {
    if (!result.destination) return
    const arr = Array.from(videos)
    const [moved] = arr.splice(result.source.index, 1)
    arr.splice(result.destination.index, 0, moved)

    setVideos(arr)

    // Update all video documents with new order
    try {
      for (let i = 0; i < arr.length; i++) {
        const docRef = doc(db, 'videos', arr[i].id)
        await updateDoc(docRef, { order: i })
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Import sample videos
  async function importSample() {
    const sample = [
      { id: 'dQw4w9WgXcQ', title: 'Sample Video 1', url: 'https://youtu.be/dQw4w9WgXcQ' },
      { id: '3JZ_D3ELwOQ', title: 'Sample Video 2', url: 'https://youtu.be/3JZ_D3ELwOQ' }
    ]

    try {
      for (const s of sample) {
        const exists = videos.find(v => v.id === s.id)
        if (!exists) await addDoc(collection(db, 'videos'), s)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Admin — Manage Videos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Form */}
        <div className="lg:col-span-1">
          <VideoForm onSave={handleSave} initial={editing} />
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={importSample} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Import Sample
            </button>
          </div>
        </div>

        {/* Video List */}
        <div className="lg:col-span-2">
          <div className="mb-2 text-sm text-gray-500">
            Drag to reorder. Click edit to modify a video. Deleting removes it permanently from the database.
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="videos">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                    {videos.length === 0 && (
                      <div className="text-gray-500 p-6 text-center border-dashed border rounded-lg">
                        No videos yet
                      </div>
                    )}
                    {videos.map((v, idx) => (
                      <Draggable draggableId={v.id} index={idx} key={v.id}>
                        {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border hover:shadow transition bg-white"
                          >
                            <img src={thumbnailUrl(v.id)} alt={v.title} className="w-full sm:w-28 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{v.title || 'Untitled'}</div>
                              <div className="text-xs text-gray-500 break-all">{v.url}</div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                              <button onClick={() => handleEdit(v.id)} className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 transition">Edit</button>
                              <button onClick={() => handleDelete(v.id)} className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 transition">Delete</button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  )
}
