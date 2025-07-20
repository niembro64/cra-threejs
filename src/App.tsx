import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import Demo from './screens/Demo'
import DrkClnBrand from './screens/DrkClnBrand'
import Foreclosure from './screens/Foreclosure'
import ForeclosureNew from './screens/ForeclosureNew'
import YouTubeDownloaderPage from './screens/YouTubeDownloaderPage'
import AudioEditor from './screens/AudioEditor'
import MediaConverter from './screens/MediaConverter'
import StatusBar from './components/StatusBar'
import './App.scss'
import './drkcln-global.scss'
// import usePageTracking from '../src/components/usePageTracking'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App flex min-h-screen flex-col">
        <StatusBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/ana" element={<DrkClnBrand />} />
          <Route path="/foreclosure" element={<Foreclosure />} />
          <Route path="/foreclosures_new" element={<ForeclosureNew />} />
          <Route path="/youtube-download" element={<YouTubeDownloaderPage />} />
          <Route path="/audio-edit" element={<AudioEditor />} />
          <Route path="/media-convert" element={<MediaConverter />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
