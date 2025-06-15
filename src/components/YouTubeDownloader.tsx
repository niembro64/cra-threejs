import React, { useState } from 'react'
import axios from 'axios'

interface VideoInfo {
  title: string
  duration: number
  thumbnail: string
  uploader: string
  view_count: number
}

const YouTubeDownloader: React.FC = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video')

  const API_BASE_URL =
    process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

  const fetchVideoInfo = async () => {
    if (!url) {
      setError('Please enter a YouTube URL')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_BASE_URL}/youtube-info/`, {
        url,
      })
      setVideoInfo(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch video information')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!url) {
      setError('Please enter a YouTube URL')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Clean the title for filename (replace spaces with underscores and remove invalid chars)
      const cleanTitle = (videoInfo?.title || 'download')
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/[<>:"/\\|?*]/g, '_') // Replace invalid filename characters
        .replace(/_+/g, '_') // Replace multiple underscores with single
        .replace(/^_|_$/g, '') // Remove leading/trailing underscores

      console.log('Video Info Title:', videoInfo?.title)
      console.log('Clean Title:', cleanTitle)
      console.log('Sending to backend:', {
        url,
        type: downloadType,
        filename: cleanTitle,
      })

      const response = await axios.post(
        `${API_BASE_URL}/youtube-download/`,
        { url, type: downloadType, filename: cleanTitle },
        {
          responseType: 'blob',
          timeout: 300000, // 5 minutes timeout for large files
        },
      )

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = downloadUrl

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers['content-disposition']
      let filename = `${cleanTitle}.${downloadType === 'audio' ? 'mp3' : 'mp4'}`

      console.log('Content-Disposition header:', contentDisposition)

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
          console.log('Extracted filename from header:', filename)
        } else {
          console.log('Could not parse filename from Content-Disposition')
        }
      } else {
        console.log('No Content-Disposition header found')
      }

      console.log('Final filename:', filename)

      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Download failed')
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="youtube-downloader pixel-font">
      <h2 className="mb-6 text-3xl font-bold text-blue-300">
        YouTube Downloader
      </h2>

      <div className="input-section mb-6">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-3 text-white placeholder-blue-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchVideoInfo}
          disabled={loading || !url}
          className="mt-3 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-700"
        >
          {loading ? 'Loading...' : 'Get Video Info'}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-700 bg-red-900/50 px-4 py-3 text-red-300">
          {error}
        </div>
      )}

      {videoInfo && (
        <div className="video-info mb-6 rounded-lg border border-blue-700 bg-blue-800/50 p-4">
          <div className="flex items-start space-x-4">
            <img
              src={videoInfo.thumbnail}
              alt={videoInfo.title}
              className="h-auto w-48 rounded"
            />
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-blue-200">
                {videoInfo.title}
              </h3>
              <p className="text-blue-400">By: {videoInfo.uploader}</p>
              <p className="text-blue-400">
                Duration: {formatDuration(videoInfo.duration)}
              </p>
              <p className="text-blue-400">
                Views: {videoInfo.view_count?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="download-options mt-6">
            <h4 className="mb-3 font-semibold text-blue-300">
              Download Options:
            </h4>
            <div className="mb-4 flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="video"
                  checked={downloadType === 'video'}
                  onChange={(e) => setDownloadType(e.target.value as 'video')}
                  className="mr-2 text-blue-500"
                />
                <span className="text-blue-200">
                  Video (Highest Quality MP4)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="audio"
                  checked={downloadType === 'audio'}
                  onChange={(e) => setDownloadType(e.target.value as 'audio')}
                  className="mr-2 text-blue-500"
                />
                <span className="text-blue-200">Audio Only (320kbps MP3)</span>
              </label>
            </div>

            <button
              onClick={handleDownload}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-700"
            >
              {loading
                ? 'Downloading...'
                : `Download ${downloadType === 'audio' ? 'MP3' : 'Video'}`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default YouTubeDownloader
