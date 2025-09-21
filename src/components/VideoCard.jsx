import React from 'react'
import { youtubeWatchUrl, thumbnailUrl } from '../utils/youtube'

export default function VideoCard({ video }) {
  const id = video.id
  const title = video.title || 'Untitled'
  const thumb = thumbnailUrl(id)
  const link = youtubeWatchUrl(id)

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow">
      <div className="relative">
        <img src={thumb} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">YouTube</div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
        <div className="mt-2 text-xs text-slate-500">Click to open on YouTube</div>
      </div>
    </a>
  )
}
