import Meyda, { MeydaFeaturesObject } from 'meyda'
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa'
import React, { useEffect, useRef, useState } from 'react'
import { useResumeStore } from '../store/audioStore'

interface AudioSpectrogramProps {
  lowerPowerRef: React.MutableRefObject<number>
  upperPowerRef: React.MutableRefObject<number>
  audioRef: React.RefObject<HTMLAudioElement>
}

const AudioSpectrogram: React.FC<AudioSpectrogramProps> = ({
  lowerPowerRef,
  upperPowerRef,
  audioRef,
}) => {
  const { play, setPlay } = useResumeStore()

  const [audioStarted, setAudioStarted] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const meydaAnalyzerRef = useRef<MeydaAnalyzer | null>(null)
  const cUpper = useRef<HTMLCanvasElement | null>(null)
  const cLower = useRef<HTMLCanvasElement | null>(null)

  const previousMelBandsRef = useRef<number[]>([])

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
            bufferSize: 512,
            featureExtractors: ['melBands'],

            callback: (features: MeydaFeaturesObject) => {
              if (
                features &&
                (features as any).melBands &&
                cUpper.current &&
                cLower.current
              ) {
                const cUpperC = cUpper.current
                const cLowerC = cLower.current
                const ctxUpper = cUpperC.getContext('2d')
                const ctxLower = cLowerC.getContext('2d')

                if (ctxUpper && ctxLower) {
                  ctxUpper.clearRect(0, 0, cUpperC.width, cUpperC.height)
                  ctxLower.clearRect(0, 0, cLowerC.width, cLowerC.height)

                  const decayFactor = 0.5
                  const currentMelBands = (features as any).melBands

                  if (previousMelBandsRef.current.length === 0) {
                    previousMelBandsRef.current = currentMelBands
                  } else {
                    previousMelBandsRef.current =
                      previousMelBandsRef.current.map((prevValue, index) => {
                        const currentValue = currentMelBands[index]
                        return Math.max(currentValue, prevValue * decayFactor)
                      })
                  }

                  const bandWidth = cUpperC.width / currentMelBands.length

                  // Draw mel bands
                  previousMelBandsRef.current.forEach((melValue, index) => {
                    const normalizedValue = melValue / 15
                    const height = normalizedValue * cUpperC.height

                    ctxUpper.fillStyle = 'rgb(59, 130, 246)'
                    ctxLower.fillStyle = 'rgb(59, 130, 246)'

                    const isLastIndex = index === currentMelBands.length - 1
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

                  // Update references
                  lowerPowerRef.current = currentMelBands
                    .slice(0, 1)
                    // @ts-ignore
                    .reduce((sum, value) => sum + value, 0)
                  upperPowerRef.current =
                    currentMelBands
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
  }, [audioRef, audioStarted, lowerPowerRef, upperPowerRef])

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

          <canvas className="h-[200px] w-full" ref={cUpper}></canvas>

          <div
            onMouseEnter={() => {
              setHoverAudioButton(true)
            }}
            onMouseLeave={() => {
              setHoverAudioButton(false)
            }}
            data-tooltip-content={
              'The audio controls the rotation of the icosahedron'
            }
            className={`tooltip flex w-full cursor-pointer flex-row items-center justify-center bg-blue-500 px-4 py-2 text-white active:text-white/50 ${
              play ? '' : 'rounded-full'
            }`}
            onClick={() => {
              startAudio()
              setPlay(!play)
            }}
          >
            {/* <div className="mr-2">
     
              <img
                className="h-[50px] object-contain   
                  filter invert"
                src="/NA_white_on_trans.png"
                alt="Niemo Audio Logo"
              />
            </div> */}
            <h4 className={`text-2xl font-bold`}>
              {hoverAudioButton ? (play ? 'PAUSE' : 'PLAY') : 'NIEMO REMIX'}
            </h4>
          </div>
          <canvas className="h-[200px] w-full" ref={cLower}></canvas>
        </>
      )}
    </div>
  )
}

export default AudioSpectrogram
