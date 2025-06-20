import React, { useState, useRef, useCallback } from 'react'
import axios, { AxiosProgressEvent } from 'axios'
import {
  FileInfo,
  SupportedConversion,
  ConversionOptions,
  ConversionResult,
  MediaAnalyzeResponse,
  AllConversionOptions,
  MediaType,
} from '../types/types'

const API_BASE_URL = 'http://localhost:8000/api/media'

const MediaConverter: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [tempId, setTempId] = useState<string | null>(null)
  const [supportedConversions, setSupportedConversions] = useState<
    SupportedConversion[]
  >([])
  const [selectedFormat, setSelectedFormat] = useState<string>('')
  const [conversionOptions, setConversionOptions] =
    useState<ConversionOptions | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<AllConversionOptions>(
    {},
  )
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [conversionResult, setConversionResult] =
    useState<ConversionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = async (selectedFile: File): Promise<void> => {
    setFile(selectedFile)
    setError(null)
    setConversionResult(null)
    setSelectedFormat('')
    setConversionOptions(null)
    setSelectedOptions({})

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axios.post(`${API_BASE_URL}/analyze/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            )
            setUploadProgress(percentCompleted)
          }
        },
      })

      const data = response.data as MediaAnalyzeResponse
      setFileInfo(data.file_info)
      setTempId(data.temp_id)
      setSupportedConversions(data.supported_conversions)
      setUploadProgress(0)
    } catch (err) {
      setError('Failed to analyze file. Please try again.')
      console.error(err)
      setUploadProgress(0)
    }
  }

  const handleFormatSelect = async (format: string): Promise<void> => {
    setSelectedFormat(format)
    setSelectedOptions({})

    if (!fileInfo || !file) return

    try {
      const response = await axios.post(`${API_BASE_URL}/options/`, {
        input_type: fileInfo.file_type || getMediaType(file.name),
        input_format: file.name.split('.').pop()?.toLowerCase(),
        output_format: format,
      })

      const data = response.data as ConversionOptions
      setConversionOptions(data)
    } catch (err) {
      console.error('Failed to get conversion options:', err)
    }
  }

  const getMediaType = (filename: string): MediaType => {
    const ext = filename.split('.').pop()?.toLowerCase() || ''
    const videoExts: string[] = [
      'mp4',
      'avi',
      'mov',
      'mkv',
      'webm',
      'flv',
      'wmv',
      'm4v',
      'mpg',
      'mpeg',
      '3gp',
      'ogv',
    ]
    const audioExts: string[] = [
      'mp3',
      'wav',
      'flac',
      'aac',
      'ogg',
      'wma',
      'm4a',
      'opus',
      'aiff',
      'ac3',
      'dts',
    ]
    const imageExts: string[] = [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'bmp',
      'webp',
      'tiff',
      'ico',
      'svg',
      'heic',
      'heif',
    ]

    if (videoExts.includes(ext)) return 'video'
    if (audioExts.includes(ext)) return 'audio'
    if (imageExts.includes(ext)) return 'image'
    return 'unknown'
  }

  const handleOptionChange = (optionName: string, value: string): void => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  const handleConvert = async (): Promise<void> => {
    if (!selectedFormat) return

    setIsConverting(true)
    setError(null)

    try {
      const payload = {
        temp_id: tempId,
        output_format: selectedFormat,
        options: selectedOptions,
      }

      const response = await axios.post(`${API_BASE_URL}/convert/`, payload)

      const data = response.data as ConversionResult
      if (data.status === 'completed') {
        setConversionResult(data)
      } else {
        pollConversionStatus(data.task_id)
      }
    } catch (err) {
      setError('Conversion failed. Please try again.')
      console.error(err)
      setIsConverting(false)
    }
  }

  const pollConversionStatus = async (taskId: string): Promise<void> => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/status/${taskId}/`)

        const data = response.data as ConversionResult
        if (data.status === 'completed') {
          setConversionResult(data)
          setIsConverting(false)
          clearInterval(pollInterval)
        } else if (data.status === 'failed') {
          setError(data.error || 'Conversion failed')
          setIsConverting(false)
          clearInterval(pollInterval)
        }
      } catch (err) {
        setError('Failed to check conversion status')
        setIsConverting(false)
        clearInterval(pollInterval)
      }
    }, 1000)
  }

  const handleDownload = (): void => {
    if (conversionResult && conversionResult.download_url) {
      const link = document.createElement('a')
      link.href = `http://localhost:8000${conversionResult.download_url}`
      link.download = '' // This forces download instead of opening in browser
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleReset = (): void => {
    setFile(null)
    setFileInfo(null)
    setTempId(null)
    setSupportedConversions([])
    setSelectedFormat('')
    setConversionOptions(null)
    setSelectedOptions({})
    setConversionResult(null)
    setError(null)
    setIsConverting(false)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    else if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB'
    else return Math.round(bytes / 1048576) + ' MB'
  }

  return (
    <div className="min-h-screen bg-blue-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border border-blue-800 bg-blue-900/50 p-8 shadow-xl backdrop-blur-sm">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Media Converter
          </h1>
          <p className="mb-8 text-lg text-blue-100">
            Convert videos, audio files, and images to different formats
          </p>

          {!file && (
            <div
              className={`mb-6 cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
                isDragging
                  ? 'border-blue-400 bg-blue-800/30'
                  : 'border-blue-700 bg-blue-800/10 hover:border-blue-500 hover:bg-blue-800/20'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg
                className="mx-auto mb-4 h-16 w-16 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 5L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 13V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mb-2 text-xl text-white">
                Drop your media file here or click to browse
              </p>
              <p className="text-blue-300">
                Supports video, audio, and image files up to 500MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInputChange}
                accept="video/*,audio/*,image/*"
                className="hidden"
              />
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mb-6">
              <div className="mb-2 h-2 w-full rounded-full bg-blue-800">
                <div
                  className="h-2 rounded-full bg-blue-400 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-center text-blue-200">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {file && fileInfo && (
            <div className="mb-6 rounded-lg bg-blue-800/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {file.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-blue-200">
                    <span>Type: {getMediaType(file.name)}</span>
                    <span>Size: {formatFileSize(file.size)}</span>
                    {fileInfo.duration && (
                      <span>Duration: {Math.round(fileInfo.duration)}s</span>
                    )}
                    {fileInfo.width && fileInfo.height && (
                      <span>
                        Resolution: {fileInfo.width}x{fileInfo.height}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {supportedConversions.length > 0 && !conversionResult && (
            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Convert to:
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {supportedConversions.map((conversion) => (
                  <button
                    key={conversion.format}
                    onClick={() => handleFormatSelect(conversion.format)}
                    className={`rounded-lg border p-3 text-center transition-colors ${
                      selectedFormat === conversion.format
                        ? 'border-blue-400 bg-blue-700 text-white'
                        : 'border-blue-700 bg-blue-800/20 text-blue-200 hover:border-blue-500 hover:bg-blue-700/30'
                    }`}
                  >
                    <span className="block font-bold">
                      {conversion.format.toUpperCase()}
                    </span>
                    {conversion.description && (
                      <span className="block text-xs opacity-75">
                        {conversion.description}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {conversionOptions &&
            conversionOptions.available_options &&
            Object.keys(conversionOptions.available_options).length > 0 && (
              <div className="mb-6">
                <h3 className="mb-4 text-xl font-semibold text-white">
                  Conversion Options
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(conversionOptions.available_options).map(
                    ([optionName, optionValues]) => (
                      <div key={optionName}>
                        <label className="mb-2 block text-sm font-medium text-blue-200">
                          {optionName.charAt(0).toUpperCase() +
                            optionName.slice(1).replace('_', ' ')}
                        </label>
                        {Array.isArray(optionValues) ? (
                          <select
                            value={
                              selectedOptions[
                                optionName as keyof AllConversionOptions
                              ] || ''
                            }
                            onChange={(e) =>
                              handleOptionChange(optionName, e.target.value)
                            }
                            className="w-full rounded-lg border border-blue-700 bg-blue-800/30 p-2 text-white focus:border-blue-400 focus:outline-none"
                          >
                            <option value="">Default</option>
                            {optionValues.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder={optionValues}
                            value={
                              selectedOptions[
                                optionName as keyof AllConversionOptions
                              ] || ''
                            }
                            onChange={(e) =>
                              handleOptionChange(optionName, e.target.value)
                            }
                            className="w-full rounded-lg border border-blue-700 bg-blue-800/30 p-2 text-white placeholder-blue-400 focus:border-blue-400 focus:outline-none"
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {selectedFormat && !conversionResult && (
            <div className="mb-6 text-center">
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isConverting ? (
                  <div className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Converting...
                  </div>
                ) : (
                  'Convert'
                )}
              </button>
            </div>
          )}

          {conversionResult && (
            <div className="rounded-lg bg-green-900/30 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Conversion Complete!
              </h3>
              <p className="mb-6 text-green-200">
                Your file has been successfully converted to{' '}
                {selectedFormat.toUpperCase()}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                >
                  Download File
                </button>
                <button
                  onClick={handleReset}
                  className="rounded-lg border border-blue-600 px-6 py-2 text-blue-300 hover:bg-blue-800/30"
                >
                  Convert Another File
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-900/30 p-4">
              <div className="flex items-center text-red-200">
                <span className="mr-2 text-xl">⚠</span>
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MediaConverter
