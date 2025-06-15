import React, { useState } from 'react'
import axios from 'axios'

interface VideoInfo {
  title: string
  duration: number
  thumbnail: string
  uploader: string
  view_count: number
  description: string
  upload_date: string
  tags: string[]
  categories: string[]
  available_qualities: number[]
  available_formats: string[]
  has_subtitles: boolean
  formats: {
    video: FormatInfo[]
    audio: FormatInfo[]
  }
}

interface FormatInfo {
  format_id: string
  ext: string
  quality: number
  filesize: number
  filesize_approx: number
  format_note: string
  fps: number
  vcodec: string
  acodec: string
  height: number
  width: number
  abr: number
  vbr: number
  tbr: number
}

interface DownloadOptions {
  type: 'video' | 'audio'
  video_quality: string
  video_format: string
  video_codec: string
  audio_quality: string
  audio_format: string
  file_size_limit: number | null
  include_subtitles: boolean
  include_thumbnail: boolean
  include_metadata: boolean
}

type ActiveTab = 'quick' | 'advanced' | 'batch'

const YouTubeDownloader: React.FC = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [activeTab, setActiveTab] = useState<ActiveTab>('quick')
  const [downloadOptions, setDownloadOptions] = useState<DownloadOptions>({
    type: 'video',
    video_quality: 'best',
    video_format: 'mp4',
    video_codec: 'auto',
    audio_quality: '320',
    audio_format: 'mp3',
    file_size_limit: null,
    include_subtitles: false,
    include_thumbnail: false,
    include_metadata: true,
  })

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
      console.log('Video Info Title:', videoInfo?.title)
      console.log('Download Options:', downloadOptions)

      const payload = {
        url,
        ...downloadOptions,
      }

      console.log('Sending to backend:', payload)

      const response = await axios.post(
        `${API_BASE_URL}/youtube-download/`,
        payload,
        {
          responseType: 'blob',
          timeout: 300000, // 5 minutes timeout for large files
        },
      )

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = downloadUrl

      // Generate filename on frontend with actual timestamp
      const filename = generateFilename(true)
      console.log('Generated filename on frontend:', filename)

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

  const updateDownloadOption = <K extends keyof DownloadOptions>(
    key: K,
    value: DownloadOptions[K],
  ) => {
    setDownloadOptions((prev) => ({ ...prev, [key]: value }))
  }

  const generateFilename = (withTimestamp = false) => {
    if (!videoInfo?.title) return 'download'

    // Clean title for filename use
    let cleanTitle = videoInfo.title
      .replace(/[<>:"/\\|?*]/g, '_')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')

    if (cleanTitle.length > 50) {
      cleanTitle = cleanTitle.substring(0, 50).replace(/_+$/, '')
    }

    // Build quality parts
    const qualityParts = []

    if (downloadOptions.type === 'video') {
      if (downloadOptions.video_quality !== 'best') {
        qualityParts.push(`${downloadOptions.video_quality}p`)
      } else {
        qualityParts.push('best')
      }
      qualityParts.push(downloadOptions.video_format.toUpperCase())
      if (downloadOptions.video_codec !== 'auto') {
        const codecMap: Record<string, string> = {
          h264: 'H264',
          h265: 'H265',
          vp9: 'VP9',
          av1: 'AV1',
        }
        qualityParts.push(
          codecMap[downloadOptions.video_codec] ||
            downloadOptions.video_codec.toUpperCase(),
        )
      }
    } else {
      qualityParts.push(`${downloadOptions.audio_quality}kbps`)
      qualityParts.push(downloadOptions.audio_format.toUpperCase())
    }

    if (downloadOptions.include_subtitles) qualityParts.push('SUBS')
    if (downloadOptions.include_thumbnail) qualityParts.push('THUMB')
    if (downloadOptions.file_size_limit)
      qualityParts.push(`MAX${downloadOptions.file_size_limit}MB`)

    const qualityString = qualityParts.join('_')
    const ext =
      downloadOptions.type === 'audio'
        ? downloadOptions.audio_format
        : downloadOptions.video_format

    // Generate timestamp when actually downloading
    const timestamp = withTimestamp
      ? new Date()
          .toISOString()
          .replace(/[-:]/g, '_')
          .replace(/T/, '_')
          .split('.')[0]
      : 'YYYY_MM_DD_HH_MM_SS'

    return `${cleanTitle}_${qualityString}_${timestamp}.${ext}`
  }

  const generateFilenamePreview = () => {
    return generateFilename(false)
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
        YouTube Downloader Pro
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
        <div className="video-info mb-6 rounded-lg border border-blue-700 bg-blue-800/50 p-6">
          {/* Video Information */}
          <div className="mb-6 flex items-start space-x-6">
            <img
              src={videoInfo.thumbnail}
              alt={videoInfo.title}
              className="h-auto w-48 rounded-lg shadow-lg"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold leading-tight text-blue-200">
                {videoInfo.title}
              </h3>
              <p className="text-blue-400">By: {videoInfo.uploader}</p>
              <p className="text-blue-400">
                Duration: {formatDuration(videoInfo.duration)}
              </p>
              <p className="text-blue-400">
                Views: {videoInfo.view_count?.toLocaleString()}
              </p>
              {videoInfo.upload_date && (
                <p className="text-blue-400">
                  Upload Date:{' '}
                  {new Date(videoInfo.upload_date).toLocaleDateString()}
                </p>
              )}
              {videoInfo.has_subtitles && (
                <p className="text-green-400">✓ Subtitles Available</p>
              )}
              {videoInfo.available_qualities.length > 0 && (
                <p className="text-blue-400">
                  Available Qualities:{' '}
                  {videoInfo.available_qualities.join('p, ')}p
                </p>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs mb-6">
            <div className="flex border-b border-blue-700">
              {(['quick', 'advanced'] as ActiveTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-400 text-blue-300'
                      : 'text-blue-500 hover:text-blue-300'
                  }`}
                >
                  {tab === 'quick' ? 'Quick Download' : 'Advanced Options'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Download Tab */}
          {activeTab === 'quick' && (
            <div className="quick-download space-y-4">
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="video"
                    checked={downloadOptions.type === 'video'}
                    onChange={(e) =>
                      updateDownloadOption('type', e.target.value as 'video')
                    }
                    className="text-blue-500"
                  />
                  <span className="text-blue-200">
                    Video (Best Quality MP4)
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="audio"
                    checked={downloadOptions.type === 'audio'}
                    onChange={(e) =>
                      updateDownloadOption('type', e.target.value as 'audio')
                    }
                    className="text-blue-500"
                  />
                  <span className="text-blue-200">
                    Audio Only (320kbps MP3)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Advanced Options Tab */}
          {activeTab === 'advanced' && (
            <div className="advanced-options space-y-6">
              {/* Media Type Selection */}
              <div className="media-type">
                <h4 className="mb-3 text-lg font-semibold text-blue-300">
                  Media Type
                </h4>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="video"
                      checked={downloadOptions.type === 'video'}
                      onChange={(e) =>
                        updateDownloadOption('type', e.target.value as 'video')
                      }
                      className="text-blue-500"
                    />
                    <span className="text-blue-200">Video</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="audio"
                      checked={downloadOptions.type === 'audio'}
                      onChange={(e) =>
                        updateDownloadOption('type', e.target.value as 'audio')
                      }
                      className="text-blue-500"
                    />
                    <span className="text-blue-200">Audio Only</span>
                  </label>
                </div>
              </div>

              {/* Video Options */}
              {downloadOptions.type === 'video' && (
                <div className="video-options space-y-4">
                  <h4 className="text-lg font-semibold text-blue-300">
                    Video Options
                  </h4>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Video Quality */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-blue-300">
                        Quality
                      </label>
                      <select
                        value={downloadOptions.video_quality}
                        onChange={(e) =>
                          updateDownloadOption('video_quality', e.target.value)
                        }
                        className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="best">Best Available</option>
                        <option value="2160">4K (2160p)</option>
                        <option value="1440">1440p</option>
                        <option value="1080">1080p</option>
                        <option value="720">720p</option>
                        <option value="480">480p</option>
                        <option value="360">360p</option>
                        <option value="240">240p</option>
                        <option value="144">144p</option>
                      </select>
                    </div>

                    {/* Video Format */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-blue-300">
                        Format
                      </label>
                      <select
                        value={downloadOptions.video_format}
                        onChange={(e) =>
                          updateDownloadOption('video_format', e.target.value)
                        }
                        className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="mp4">MP4 (Most Compatible)</option>
                        <option value="webm">WebM (Smaller Size)</option>
                        <option value="mkv">MKV (High Quality)</option>
                        <option value="avi">AVI (Legacy)</option>
                        <option value="mov">MOV (Apple)</option>
                        <option value="flv">FLV (Flash)</option>
                      </select>
                    </div>

                    {/* Video Codec */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-blue-300">
                        Codec
                      </label>
                      <select
                        value={downloadOptions.video_codec}
                        onChange={(e) =>
                          updateDownloadOption('video_codec', e.target.value)
                        }
                        className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="auto">Auto</option>
                        <option value="h264">H.264/AVC</option>
                        <option value="h265">H.265/HEVC</option>
                        <option value="vp9">VP9</option>
                        <option value="av1">AV1</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio Options */}
              <div className="audio-options space-y-4">
                <h4 className="text-lg font-semibold text-blue-300">
                  Audio Options
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Audio Quality/Bitrate */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-blue-300">
                      Quality (Bitrate)
                    </label>
                    <select
                      value={downloadOptions.audio_quality}
                      onChange={(e) =>
                        updateDownloadOption('audio_quality', e.target.value)
                      }
                      className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="320">320 kbps (Premium)</option>
                      <option value="256">256 kbps (High)</option>
                      <option value="192">192 kbps (Standard)</option>
                      <option value="128">128 kbps (Good)</option>
                      <option value="96">96 kbps (Acceptable)</option>
                      <option value="64">64 kbps (Basic)</option>
                    </select>
                  </div>

                  {/* Audio Format */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-blue-300">
                      Format
                    </label>
                    <select
                      value={downloadOptions.audio_format}
                      onChange={(e) =>
                        updateDownloadOption('audio_format', e.target.value)
                      }
                      className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="mp3">MP3 (Universal)</option>
                      <option value="m4a">M4A (Apple)</option>
                      <option value="flac">FLAC (Lossless)</option>
                      <option value="ogg">OGG (Open Source)</option>
                      <option value="wav">WAV (Uncompressed)</option>
                      <option value="opus">OPUS (Modern)</option>
                      <option value="aac">AAC (Advanced)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="advanced-settings space-y-4">
                <h4 className="text-lg font-semibold text-blue-300">
                  Advanced Settings
                </h4>

                {/* File Size Limit */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-blue-300">
                    Max File Size (MB) - Optional
                  </label>
                  <input
                    type="number"
                    placeholder="Leave empty for no limit"
                    value={downloadOptions.file_size_limit || ''}
                    onChange={(e) =>
                      updateDownloadOption(
                        'file_size_limit',
                        e.target.value ? parseInt(e.target.value) : null,
                      )
                    }
                    className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white placeholder-blue-400 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Additional Options */}
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={downloadOptions.include_subtitles}
                      onChange={(e) =>
                        updateDownloadOption(
                          'include_subtitles',
                          e.target.checked,
                        )
                      }
                      className="text-blue-500"
                      disabled={!videoInfo.has_subtitles}
                    />
                    <span
                      className={`${!videoInfo.has_subtitles ? 'text-gray-500' : 'text-blue-200'}`}
                    >
                      Include Subtitles{' '}
                      {!videoInfo.has_subtitles && '(Not Available)'}
                    </span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={downloadOptions.include_thumbnail}
                      onChange={(e) =>
                        updateDownloadOption(
                          'include_thumbnail',
                          e.target.checked,
                        )
                      }
                      className="text-blue-500"
                    />
                    <span className="text-blue-200">Include Thumbnail</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={downloadOptions.include_metadata}
                      onChange={(e) =>
                        updateDownloadOption(
                          'include_metadata',
                          e.target.checked,
                        )
                      }
                      className="text-blue-500"
                    />
                    <span className="text-blue-200">Include Metadata</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Filename Preview */}
          <div className="filename-preview mt-6 rounded-lg border border-blue-800 bg-blue-900/30 p-4">
            <h4 className="mb-2 text-sm font-medium text-blue-300">
              Filename Preview:
            </h4>
            <div className="break-all rounded bg-blue-950/50 p-2 font-mono text-xs text-blue-200">
              {generateFilenamePreview()}
            </div>
            <p className="mt-1 text-xs text-blue-400">
              * Timestamp will be replaced with actual download time
              (YYYY_MM_DD_HH_MM_SS format)
            </p>
          </div>

          {/* Download Button */}
          <div className="download-section mt-8 border-t border-blue-700 pt-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="download-summary space-y-1 text-sm text-blue-400">
                <p>
                  Download:{' '}
                  {downloadOptions.type === 'audio' ? 'Audio Only' : 'Video'}
                </p>
                <p>
                  Format:{' '}
                  {downloadOptions.type === 'audio'
                    ? downloadOptions.audio_format.toUpperCase()
                    : downloadOptions.video_format.toUpperCase()}
                  {downloadOptions.type === 'audio' &&
                    ` (${downloadOptions.audio_quality}kbps)`}
                  {downloadOptions.type === 'video' &&
                    downloadOptions.video_quality !== 'best' &&
                    ` (${downloadOptions.video_quality}p)`}
                </p>
                {(downloadOptions.include_subtitles ||
                  downloadOptions.include_thumbnail ||
                  downloadOptions.include_metadata) && (
                  <p>
                    Extras:{' '}
                    {[
                      downloadOptions.include_subtitles && 'Subtitles',
                      downloadOptions.include_thumbnail && 'Thumbnail',
                      downloadOptions.include_metadata && 'Metadata',
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
              </div>

              <button
                onClick={handleDownload}
                disabled={loading}
                className="min-w-[200px] rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Downloading...</span>
                  </span>
                ) : (
                  `Download ${downloadOptions.type === 'audio' ? downloadOptions.audio_format.toUpperCase() : downloadOptions.video_format.toUpperCase()}`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default YouTubeDownloader
