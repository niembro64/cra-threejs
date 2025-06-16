/* eslint-disable no-case-declarations */
import React, { useState, useRef, useEffect } from 'react'

interface AudioRegion {
  start: number
  end: number
}

type DragMode = 'none' | 'selecting' | 'start-handle' | 'end-handle' | 'seeking'

const AudioEditor: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedRegion, setSelectedRegion] = useState<AudioRegion | null>(null)
  const [dragMode, setDragMode] = useState<DragMode>('none')
  const [dragStart, setDragStart] = useState(0)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [showGrid, setShowGrid] = useState(true)
  const [playingSelection, setPlayingSelection] = useState(false)

  // Input fields for precise selection
  const [startInput, setStartInput] = useState('')
  const [endInput, setEndInput] = useState('')

  const audioContext = useRef<AudioContext | null>(null)
  const audioSource = useRef<AudioBufferSourceNode | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startTime = useRef<number>(0)
  const animationFrame = useRef<number>()

  useEffect(() => {
    audioContext.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)()
    return () => {
      if (audioContext.current) {
        audioContext.current.close()
      }
    }
  }, [])

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('audio/')) {
      setAudioFile(files[0])
      loadAudioFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setAudioFile(files[0])
      loadAudioFile(files[0])
    }
  }

  const loadAudioFile = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const decodedData =
        await audioContext.current!.decodeAudioData(arrayBuffer)
      setAudioBuffer(decodedData)
      setDuration(decodedData.duration)
      setCurrentTime(0)
      setSelectedRegion(null)
    } catch (error) {
      console.error('Error loading audio file:', error)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = (seconds % 60).toFixed(2)
    return `${mins}:${secs.padStart(5, '0')}`
  }

  // Unified Animation System
  const stopAnimationLoop = () => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
      animationFrame.current = undefined
    }
  }

  const startAnimationLoop = (startOffset: number, endTime?: number) => {
    stopAnimationLoop()

    const updateTime = () => {
      if (audioContext.current && audioSource.current) {
        const elapsed = audioContext.current.currentTime - startTime.current
        const newTime = startOffset + elapsed
        const maxTime = endTime || audioBuffer!.duration

        setCurrentTime(Math.max(startOffset, Math.min(newTime, maxTime)))
        animationFrame.current = requestAnimationFrame(updateTime)
      }
    }

    animationFrame.current = requestAnimationFrame(updateTime)
  }

  // Unified Playback System
  const startPlayback = (
    startOffset: number,
    endTime?: number,
    isSelectionPlayback = false,
  ) => {
    if (!audioBuffer || !audioContext.current) return

    // Stop any existing playback
    stopPlayback()

    // Create and configure audio source
    const source = audioContext.current.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContext.current.destination)

    const playDuration = (endTime || audioBuffer.duration) - startOffset
    source.start(0, startOffset, playDuration)

    // Update state
    audioSource.current = source
    setIsPlaying(true)
    setPlayingSelection(isSelectionPlayback)
    setCurrentTime(startOffset)
    startTime.current = audioContext.current.currentTime

    // Start animation
    startAnimationLoop(startOffset, endTime)

    // Handle playback end
    source.onended = () => {
      setIsPlaying(false)
      setPlayingSelection(false)
      stopAnimationLoop()

      if (isSelectionPlayback && selectedRegion) {
        setCurrentTime(selectedRegion.start)
      }
    }
  }

  const stopPlayback = () => {
    if (audioSource.current) {
      audioSource.current.stop()
      audioSource.current = null
    }
    stopAnimationLoop()
  }

  const drawWaveform = (buffer: AudioBuffer) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, width, height)

    // Draw grid if enabled
    if (showGrid) {
      ctx.strokeStyle = '#333333'
      ctx.lineWidth = 1
      const gridInterval = duration > 60 ? 10 : duration > 10 ? 1 : 0.1

      for (let t = 0; t < duration; t += gridInterval) {
        const x = (t / duration) * width
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()

        // Draw time labels
        ctx.fillStyle = '#666666'
        ctx.font = '10px monospace'
        ctx.fillText(formatTime(t), x + 2, 12)
      }
    }

    // Draw waveform
    const data = buffer.getChannelData(0)
    const samplesPerPixel = Math.ceil(data.length / width)
    const amp = height / 2

    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 1
    ctx.beginPath()

    for (let i = 0; i < width; i++) {
      let min = 1
      let max = -1

      const sampleStart = i * samplesPerPixel
      const sampleEnd = Math.min(sampleStart + samplesPerPixel, data.length)

      for (let j = sampleStart; j < sampleEnd; j++) {
        const datum = data[j] || 0
        if (datum < min) min = datum
        if (datum > max) max = datum
      }

      if (min === 1 && max === -1) {
        min = max = 0
      }

      ctx.moveTo(i, (1 + min) * amp)
      ctx.lineTo(i, (1 + max) * amp)
    }

    ctx.stroke()

    // Draw selected region
    if (selectedRegion) {
      const startX = (selectedRegion.start / duration) * width
      const endX = (selectedRegion.end / duration) * width

      // Selection background
      ctx.fillStyle = 'rgba(255, 255, 0, 0.2)'
      ctx.fillRect(startX, 0, endX - startX, height)

      // Selection borders
      ctx.strokeStyle = '#ffff00'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(startX, 0)
      ctx.lineTo(startX, height)
      ctx.moveTo(endX, 0)
      ctx.lineTo(endX, height)
      ctx.stroke()

      // Selection handles
      const handleSize = 8
      ctx.fillStyle = '#ffff00'
      // Start handle
      ctx.fillRect(
        startX - handleSize / 2,
        height / 2 - handleSize / 2,
        handleSize,
        handleSize,
      )
      // End handle
      ctx.fillRect(
        endX - handleSize / 2,
        height / 2 - handleSize / 2,
        handleSize,
        handleSize,
      )
    }

    // Draw hover line
    if (hoverTime !== null) {
      const hoverX = (hoverTime / duration) * width
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(hoverX, 0)
      ctx.lineTo(hoverX, height)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw playback position
    const playbackX = (currentTime / duration) * width

    // Draw playback line
    ctx.strokeStyle = '#ff0000'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(playbackX, 0)
    ctx.lineTo(playbackX, height)
    ctx.stroke()

    // Draw playback head (draggable handle)
    const headSize = 12
    ctx.fillStyle = '#ff0000'
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2

    // Draw circle at top
    ctx.beginPath()
    ctx.arc(playbackX, headSize / 2, headSize / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // Draw triangle pointer
    ctx.fillStyle = '#ff0000'
    ctx.beginPath()
    ctx.moveTo(playbackX - 6, headSize)
    ctx.lineTo(playbackX + 6, headSize)
    ctx.lineTo(playbackX, headSize + 8)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const play = () => {
    startPlayback(currentTime)
  }

  const playSelection = () => {
    if (!selectedRegion) return
    startPlayback(selectedRegion.start, selectedRegion.end, true)
  }

  const pause = () => {
    stopPlayback()
    setIsPlaying(false)
    setPlayingSelection(false)
  }

  const seekTo = (time: number) => {
    const wasPlaying = isPlaying
    const wasPlayingSelection = playingSelection

    // Stop current playback
    stopPlayback()
    setIsPlaying(false)
    setPlayingSelection(false)

    // Update position immediately
    setCurrentTime(time)

    // If was playing, restart from new position
    if (wasPlaying) {
      if (
        wasPlayingSelection &&
        selectedRegion &&
        time >= selectedRegion.start &&
        time <= selectedRegion.end
      ) {
        // Continue playing selection from new position
        startPlayback(time, selectedRegion.end, true)
      } else {
        // Normal playback from new position
        startPlayback(time)
      }
    }
  }

  // Mouse Coordinate Utilities
  const getCanvasRect = () => canvasRef.current!.getBoundingClientRect()

  const getTimeFromX = (x: number): number => {
    const rect = getCanvasRect()
    return Math.max(0, Math.min((x / rect.width) * duration, duration))
  }

  const getXFromTime = (time: number): number => {
    const rect = getCanvasRect()
    return (time / duration) * rect.width
  }

  // Interaction Detection Utilities
  const isNearHandle = (
    x: number,
    handleTime: number,
    threshold: number = 8,
  ): boolean => {
    const handleX = getXFromTime(handleTime)
    return Math.abs(x - handleX) <= threshold
  }

  const isNearPlaybackPosition = (
    x: number,
    threshold: number = 15,
  ): boolean => {
    const playbackX = getXFromTime(currentTime)
    return Math.abs(x - playbackX) <= threshold
  }

  const detectInteractionMode = (x: number): DragMode => {
    // Priority order: handles, then playback position, then selection
    if (selectedRegion) {
      if (isNearHandle(x, selectedRegion.start)) return 'start-handle'
      if (isNearHandle(x, selectedRegion.end)) return 'end-handle'
    }

    if (isNearPlaybackPosition(x)) return 'seeking'

    return 'selecting'
  }

  const getCursorForPosition = (x: number): string => {
    if (
      selectedRegion &&
      (isNearHandle(x, selectedRegion.start) ||
        isNearHandle(x, selectedRegion.end))
    ) {
      return 'ew-resize'
    }
    if (isNearPlaybackPosition(x)) {
      return 'grab'
    }
    return 'crosshair'
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (!audioBuffer) return

    const rect = getCanvasRect()
    const x = e.clientX - rect.left
    const time = getTimeFromX(x)
    const mode = detectInteractionMode(x)

    setDragStart(time)
    setDragMode(mode)

    // For any non-handle click, immediately seek
    if (mode === 'selecting' || mode === 'seeking') {
      seekTo(time)
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!audioBuffer) return

    const rect = getCanvasRect()
    const x = e.clientX - rect.left
    const time = getTimeFromX(x)
    const canvas = canvasRef.current!

    setHoverTime(time)
    canvas.style.cursor = getCursorForPosition(x)

    // Handle different drag modes
    switch (dragMode) {
      case 'seeking':
        // Check if becoming a selection (significant drag)
        if (Math.abs(time - dragStart) > 0.5) {
          setDragMode('selecting')
          const start = Math.min(dragStart, time)
          const end = Math.max(dragStart, time)
          setSelectedRegion({ start, end })
        } else {
          setCurrentTime(time)
        }
        break

      case 'selecting':
        const start = Math.min(dragStart, time)
        const end = Math.max(dragStart, time)
        setSelectedRegion({ start, end })
        break

      case 'start-handle':
        if (selectedRegion) {
          setSelectedRegion({
            start: Math.max(0, Math.min(time, selectedRegion.end - 0.1)),
            end: selectedRegion.end,
          })
        }
        break

      case 'end-handle':
        if (selectedRegion) {
          setSelectedRegion({
            start: selectedRegion.start,
            end: Math.min(duration, Math.max(time, selectedRegion.start + 0.1)),
          })
        }
        break
    }
  }

  const handleCanvasMouseUp = (e: React.MouseEvent) => {
    const rect = getCanvasRect()
    const x = e.clientX - rect.left
    const time = getTimeFromX(x)

    // Finalize seeking operations
    if (dragMode === 'seeking') {
      seekTo(time)
    }

    setDragMode('none')
  }

  const handleCanvasMouseLeave = () => {
    setHoverTime(null)
  }

  const handleStartInputChange = (value: string) => {
    setStartInput(value)
    const time = parseFloat(value)
    if (!isNaN(time) && selectedRegion) {
      setSelectedRegion({
        start: Math.max(0, Math.min(time, selectedRegion.end - 0.1)),
        end: selectedRegion.end,
      })
    }
  }

  const handleEndInputChange = (value: string) => {
    setEndInput(value)
    const time = parseFloat(value)
    if (!isNaN(time) && selectedRegion) {
      setSelectedRegion({
        start: selectedRegion.start,
        end: Math.min(duration, Math.max(time, selectedRegion.start + 0.1)),
      })
    }
  }

  useEffect(() => {
    if (selectedRegion) {
      setStartInput(selectedRegion.start.toFixed(2))
      setEndInput(selectedRegion.end.toFixed(2))
    } else {
      setStartInput('')
      setEndInput('')
    }
  }, [selectedRegion])

  useEffect(() => {
    if (audioBuffer && duration > 0) {
      drawWaveform(audioBuffer)
    }
  }, [audioBuffer, currentTime, selectedRegion, hoverTime, showGrid, duration])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && audioBuffer) {
        e.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [audioBuffer, isPlaying])

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold">Audio Editor</h1>

        {!audioFile ? (
          <div
            className="rounded-lg border-2 border-dashed border-gray-500 p-16 text-center transition-colors hover:border-gray-400"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
          >
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mb-4 text-xl">Drag and drop an audio file here</p>
            <p className="mb-4 text-gray-400">or</p>
            <label className="inline-flex cursor-pointer items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
              <span>Choose File</span>
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleFileSelect}
              />
            </label>
            <p className="mt-4 text-sm text-gray-400">
              Supports MP3, WAV, OGG, and other audio formats
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-800 p-6">
            <div className="mb-4">
              <h2 className="mb-2 text-xl font-semibold">{audioFile.name}</h2>
              <div className="mb-4 flex items-center space-x-4">
                <button
                  onClick={togglePlayPause}
                  className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                >
                  {isPlaying ? (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Play{playingSelection ? ' (Selection)' : ''}</span>
                    </>
                  )}
                </button>

                {selectedRegion && (
                  <button
                    onClick={playSelection}
                    className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Play Selection</span>
                  </button>
                )}

                {selectedRegion && (
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="flex items-center space-x-2 rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                  >
                    <span>Clear Selection</span>
                  </button>
                )}
              </div>

              {/* View Controls and Instructions */}
              <div className="mb-4 flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Show Grid</span>
                </label>
                <div className="text-xs text-gray-400">
                  💡 Click to seek • Drag red line to scrub • Spacebar to
                  play/pause
                </div>
              </div>
            </div>

            {/* Time Display */}
            <div className="mb-4 rounded-lg bg-gray-700 p-3">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-gray-300">Current: </span>
                  <span className="font-mono text-white">
                    {formatTime(currentTime)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">Duration: </span>
                  <span className="font-mono text-white">
                    {formatTime(duration)}
                  </span>
                </div>
                {hoverTime !== null && (
                  <div>
                    <span className="text-gray-300">Hover: </span>
                    <span className="font-mono text-yellow-300">
                      {formatTime(hoverTime)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={200}
                className="w-full rounded border border-gray-600"
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseLeave}
              />
            </div>

            {selectedRegion && (
              <div className="mt-4 rounded-lg bg-gray-700 p-4">
                <h3 className="mb-3 text-lg font-semibold">Selected Region</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm text-gray-300">
                      Start Time (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={selectedRegion.end - 0.1}
                      value={startInput}
                      onChange={(e) => handleStartInputChange(e.target.value)}
                      className="w-full rounded border border-gray-500 bg-gray-600 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-300">
                      End Time (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min={selectedRegion.start + 0.1}
                      max={duration}
                      value={endInput}
                      onChange={(e) => handleEndInputChange(e.target.value)}
                      className="w-full rounded border border-gray-500 bg-gray-600 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-300">
                      Duration
                    </label>
                    <div className="rounded border border-gray-500 bg-gray-600 px-3 py-2 text-gray-300">
                      {formatTime(selectedRegion.end - selectedRegion.start)}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-300">
                  <p>
                    💡 Tip: Drag the yellow handles on the waveform to adjust
                    selection boundaries, or use the input fields above for
                    precise timing.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioEditor
