import React, { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard'

const STORAGE_KEY = 'youtube_showcase_videos_v1'

export default function Home() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setVideos(JSON.parse(raw))
      } catch {
        setVideos([])
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 lg:px-16 py-8">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-lg">
  <div className="flex-1">
<h1 className="text-4xl md:text-5xl font-extrabold font-telugu text-gray-800 leading-tight">
  నమస్కారం
</h1>


    <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-lg">
      Welcome to <strong>Yours Media</strong>, where students can explore high-quality educational content. Enhance your knowledge with curated videos, tutorials, and tips for better learning.
    </p>
    <div className="mt-6 flex flex-wrap gap-4">
      <a href="https://www.youtube.com/@yoursmediaofficial" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition">
        Explore Videos
      </a>
      <a href="https://www.youtube.com/@yoursmediaofficial" className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition">
        About Us
      </a>
    </div>
  </div>
  <div className="flex-1 hidden md:block">
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl">
        <a href="https://youtu.be/68MrMom5xbc?si=uxjise4_U4d8G6y3">
      <img 
        src="https://img.youtube.com/vi/68MrMom5xbc/maxresdefault.jpg" 
        alt="Yours Media Video Thumbnail" 
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none' }} 
      />
      </a>
    </div>
  </div>
</section>


      {/* Latest Videos Section */}
      <section id="collections" className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Latest Videos</h2>
        {videos.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center text-gray-500 text-lg">
            No videos available yet — stay tuned for educational content from Yours Media!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="mb-12">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800">About Yours Media</h3>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Yours Media is dedicated to helping students excel academically by providing clear, concise, and engaging educational videos. Explore tutorials, concept explanations, and tips designed to make learning easier and fun.
          </p>
        </div>
      </section>

    </div>
  )
}
