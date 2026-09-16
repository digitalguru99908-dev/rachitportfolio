import { useEffect, useRef } from 'react'
import type HlsType from 'hls.js'

interface BackgroundVideoProps {
  src: string
  flip?: boolean
  overlay?: string
}

export default function BackgroundVideo({
  src,
  flip = false,
  overlay,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

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
        hls = new Hls({ enableWorker: true })
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
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 top-1/2 h-full w-full min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        style={flip ? { transform: 'scaleY(-1)' } : undefined}
      />
      {overlay ? <div className={`absolute inset-0 ${overlay}`} /> : null}
    </div>
  )
}