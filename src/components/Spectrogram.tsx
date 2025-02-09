import Meyda, { MeydaFeaturesObject } from 'meyda'
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa'
import React, { useEffect, useRef, useState } from 'react'
import { ProjectStore } from '../store/ProjectStore'

interface AudioSpectrogramProps {
  highFreqPowerRef: React.MutableRefObject<number>
  lowFreqPowerRef: React.MutableRefObject<number>
  audioRef: React.RefObject<HTMLAudioElement>
}

const AudioSpectrogram: React.FC<AudioSpectrogramProps> = ({
  highFreqPowerRef,
  lowFreqPowerRef,
  audioRef,
}) => {
  const { play, setPlay } = ProjectStore()

  const [audioStarted, setAudioStarted] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const meydaAnalyzerRef = useRef<MeydaAnalyzer | null>(null)
  const cUpper = useRef<HTMLCanvasElement | null>(null)
  const cLower = useRef<HTMLCanvasElement | null>(null)
  const cUpperLowpass = useRef<HTMLCanvasElement | null>(null)
  const cLowerLowpass = useRef<HTMLCanvasElement | null>(null)

  const myMelBandsLowPass = useRef<number[]>([])

  Meyda.melBands = 80

  const [hoverAudioButton, setHoverAudioButton] = useState(false)

  const startAudio = () => {
    if (audioStarted) return
    setAudioStarted(true)
  }

  useEffect(() => {
    if (!audioRef.current) return

    if (!audioStarted) return

    if (play) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [play, audioRef, audioStarted])

  useEffect(() => {
    if (!audioStarted) return

    const setupMeyda = async (): Promise<void> => {
      if (audioRef.current && !audioContextRef.current) {
        try {
          const audioContext = new AudioContext()
          audioContextRef.current = audioContext

          const source = audioContext.createMediaElementSource(audioRef.current)
          source.connect(audioContext.destination)

          meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
            audioContext,
            source,
            bufferSize: 512 * 2,
            featureExtractors: ['melBands'],

            callback: (features: MeydaFeaturesObject) => {
              if (
                features &&
                (features as any).melBands &&
                cUpper.current &&
                cLower.current &&
                cUpperLowpass.current &&
                cLowerLowpass.current
              ) {
                const cUpperC = cUpper.current
                const cLowerC = cLower.current
                const cUpperLowpassC = cUpperLowpass.current
                const cLowerLowpassC = cLowerLowpass.current

                const ctxUpper = cUpperC.getContext('2d')
                const ctxLower = cLowerC.getContext('2d')
                const ctxUpperLowpass = cUpperLowpassC.getContext('2d')
                const ctxLowerLowpass = cLowerLowpassC.getContext('2d')

                if (
                  ctxUpper &&
                  ctxLower &&
                  ctxUpperLowpass &&
                  ctxLowerLowpass
                ) {
                  ctxUpper.clearRect(0, 0, cUpperC.width, cUpperC.height)
                  ctxLower.clearRect(0, 0, cLowerC.width, cLowerC.height)
                  ctxUpperLowpass.clearRect(
                    0,
                    0,
                    cUpperLowpassC.width,
                    cUpperLowpassC.height,
                  )
                  ctxLowerLowpass.clearRect(
                    0,
                    0,
                    cLowerLowpassC.width,
                    cLowerLowpassC.height,
                  )

                  const decayFactor = 0.97
                  // @ts-ignore
                  const myMelBands: number[] = features.melBands

                  if (myMelBandsLowPass.current.length === 0) {
                    myMelBandsLowPass.current = myMelBands
                  } else {
                    myMelBandsLowPass.current = myMelBandsLowPass.current.map(
                      (prevValue, index) => {
                        const currentValue = myMelBands[index]
                        return Math.max(currentValue, prevValue * decayFactor)
                      },
                    )
                  }

                  const bandWidth = cUpperC.width / myMelBands.length

                  const colorR: number = 59
                  const colorG: number = 130
                  const colorB: number = 246

                  const divisor: number = 4

                  const coloRHalf: number = Math.floor(colorR / divisor)
                  const coloGHalf: number = Math.floor(colorG / divisor)
                  const coloBHalf: number = Math.floor(colorB / divisor)

                  const fillStyleBlue = `rgb(${colorR}, ${colorG}, ${colorB})`
                  const fillStyleBlueDark = `rgb(${coloRHalf}, ${coloGHalf}, ${coloBHalf})`
                  const fillStyleRed = fillStyleBlue
                  const fillStyleRedDark = fillStyleBlueDark
                  // const fillStyleRed = 'rgb(255, 0, 0)'
                  // const fillStyleRedDark = 'rgb(200, 100, 0)'

                  const powerDivisor: number = 30
                  // Draw mel bands
                  myMelBands.forEach((melValue, index) => {
                    const normalizedValue = melValue / powerDivisor
                    const height = normalizedValue * cUpperC.height

                    ctxUpper.fillStyle = fillStyleBlue
                    ctxLower.fillStyle = fillStyleRed

                    ctxUpperLowpass.fillStyle = fillStyleBlueDark
                    ctxLowerLowpass.fillStyle = fillStyleRedDark

                    const isLastIndex = index === myMelBands.length - 1
                    const bwMultiplier: number = 2.08
                    const bwCurr: number =
                      bandWidth * (isLastIndex ? 1 : bwMultiplier)
                    const startX: number = index * bandWidth

                    ctxUpper.fillRect(
                      startX,
                      cUpperC.height - height,
                      bwCurr,
                      height,
                    )
                    ctxLower.fillRect(startX, 0, bwCurr, height)
                  })
                  // Draw mel bands
                  myMelBandsLowPass.current.forEach((melValue, index) => {
                    const normalizedValue = melValue / powerDivisor
                    const height = normalizedValue * cUpperC.height

                    ctxUpper.fillStyle = fillStyleBlue
                    ctxLower.fillStyle = fillStyleRed

                    ctxUpperLowpass.fillStyle = fillStyleBlueDark
                    ctxLowerLowpass.fillStyle = fillStyleRedDark

                    const isLastIndex = index === myMelBands.length - 1
                    const bwMultiplier: number = 2.08
                    const bwCurr: number =
                      bandWidth * (isLastIndex ? 1 : bwMultiplier)
                    const startX: number = index * bandWidth

                    ctxUpperLowpass.fillRect(
                      startX,
                      cUpperLowpassC.height - height,
                      bwCurr,
                      height,
                    )
                    ctxLowerLowpass.fillRect(startX, 0, bwCurr, height)
                  })

                  // Update references
                  highFreqPowerRef.current = myMelBands
                    .slice(0, 1)
                    // @ts-ignore
                    .reduce((sum, value) => sum + value, 0)
                  lowFreqPowerRef.current =
                    myMelBands
                      .slice(18, 26)
                      // @ts-ignore
                      .reduce((sum, value) => sum + value, 0) / 2
                }
              }
            },
          })

          meydaAnalyzerRef.current.start()
        } catch (error) {
          console.error('Error setting up audio:', error)
        }
      }
    }

    const audioElement = audioRef.current

    if (audioElement) {
      audioElement.addEventListener('canplay', setupMeyda)
    }

    return () => {
      meydaAnalyzerRef.current?.stop()
      audioContextRef.current?.close()
      if (audioElement) {
        audioElement.removeEventListener('canplay', setupMeyda)
      }
    }
  }, [audioRef, audioStarted, highFreqPowerRef, lowFreqPowerRef])

  return (
    <div className="flex w-[100%] flex-col items-center justify-center">
      {!audioStarted ? (
        <img
          data-tooltip-content={'A Remix of a Bohemian Rhapsody by Niemo'}
          className="pixel-art tooltip h-[130px] w-[130px] cursor-pointer transition-all"
          src="/qwhite_hardpixels_transbg.png"
          alt="Niemo Audio Logo"
          onClick={startAudio}
        />
      ) : (
        <>
          <audio ref={audioRef} loop>
            <source src="song.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          <div className="relative flex w-full flex-col items-center justify-center">
            <canvas className="z-10 h-[200px] w-full" ref={cUpper}></canvas>
            <canvas
              className="absolute left-0 top-0 z-0 h-[200px] w-full"
              ref={cUpperLowpass}
            ></canvas>

            <button
              type="button"
              onMouseEnter={() => {
                setHoverAudioButton(true)
              }}
              onMouseLeave={() => {
                setHoverAudioButton(false)
              }}
              data-tooltip-content={
                'The audio controls the rotation of the icosahedron'
              }
              className={`tooltip flex w-full cursor-pointer flex-row items-center justify-center bg-blue-500 px-4 py-2 text-2xl font-bold text-white active:text-white/50 ${
                play ? '' : ''
              }`}
              onClick={() => {
                startAudio()
                setPlay(!play)
              }}
            >
              {hoverAudioButton ? (play ? 'PAUSE' : 'PLAY') : 'NIEMO REMIX'}
            </button>
            <canvas className="z-10 h-[200px] w-full" ref={cLower}></canvas>
            <canvas
              className="absolute bottom-0 left-0 z-0 h-[200px] w-full"
              ref={cLowerLowpass}
            ></canvas>
          </div>
        </>
      )}
    </div>
  )
}

export default AudioSpectrogram
