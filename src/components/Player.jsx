import { useEffect, useRef, useState } from 'react'

export default function Player({ src, poster }) {
  const videoRef = useRef(null)
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onCanPlay = () => setReady(true)
    v.addEventListener('canplay', onCanPlay)
    return () => v.removeEventListener('canplay', onCanPlay)
  }, [])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#161b22]">
      {!isReady && (
        <div className="absolute inset-0 grid place-items-center text-white/70">Buffering…</div>
      )}
      <video ref={videoRef} controls poster={poster} className="w-full h-auto" preload="metadata">
        {src?.endsWith('.m3u8') ? (
          // Basic fallback: many browsers support HLS natively; for others, the file will be downloadable
          <source src={src} type="application/vnd.apple.mpegurl" />
        ) : (
          <source src={src} type="video/mp4" />
        )}
      </video>
    </div>
  )
}
