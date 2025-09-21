export function parseYouTubeUrl(url) {
  if (!url) return null
  try {
    // normalize
    const u = url.trim()
    // common patterns
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /v=([a-zA-Z0-9_-]{11})/
    ]
    for (const p of patterns) {
      const m = u.match(p)
      if (m && m[1]) return m[1]
    }
    // fallback: last 11 chars if looks like id
    const cand = u.slice(-11)
    if (/^[a-zA-Z0-9_-]{11}$/.test(cand)) return cand
    return null
  } catch {
    return null
  }
}

export function thumbnailUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export function youtubeWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`
}
