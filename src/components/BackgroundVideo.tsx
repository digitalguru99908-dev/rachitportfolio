import { useEffect, useRef, useState } from 'react'
import type HlsType from 'hls.js'

interface BackgroundVideoProps {
  src: string
  flip?: boolean
  overlay?: string
  fallback?: string
}

export default function BackgroundVideo({
  src,
  flip = false,
  overlay,
  fallback,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    let cancelled = false
    let hls: HlsType | null = null
    let nativeHandler: (() => void) | null = null

    const play = () => {
      video.muted = true
      video.play().catch(() => video.play().catch(() => {}))
    }

    const init = async () => {
      const { default: Hls } = await import('hls.js')

      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: false })
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (!cancelled) play()
        })
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError()
              break
            default:
              hls?.destroy()
              hls = null
              video.src = src
              if (!cancelled) play()
              break
          }
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        nativeHandler = () => play()
        video.addEventListener('loadedmetadata', nativeHandler)
      }
    }

    init()

    return () => {
      cancelled = true
      hls?.destroy()
      if (nativeHandler) {
        video.removeEventListener('loadedmetadata', nativeHandler)
      }
    }
  }, [src])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {fallback ? (
        <div
          className="absolute inset-0"
          style={{ background: fallback }}
        />
      ) : null}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onPlaying={() => setPlaying(true)}
        onPlay={() => setPlaying(true)}
        className={`absolute h-full w-full min-w-full min-h-full object-cover transition-opacity duration-700 ${
          playing ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) ${flip ? 'scaleY(-1)' : ''}`,
        }}
      />
      {overlay ? <div className={`absolute inset-0 ${overlay}`} /> : null}
    </div>
  )
}