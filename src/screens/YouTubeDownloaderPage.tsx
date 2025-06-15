import React from 'react'
import YouTubeDownloader from '../components/YouTubeDownloader'

const YouTubeDownloaderPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border border-blue-800 bg-blue-900/50 p-8 shadow-xl backdrop-blur-sm">
          <YouTubeDownloader />
        </div>
      </div>
    </div>
  )
}

export default YouTubeDownloaderPage
