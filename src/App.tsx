import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import './App.scss';
// import usePageTracking from '../src/components/usePageTracking'

const Main = lazy(() => import('./components/Main'));
const Demo = lazy(() => import('./screens/Demo'));
const DrkClnBrand = lazy(() => import('./screens/DrkClnBrand'));
const YouTubeDownloaderPage = lazy(() => import('./screens/YouTubeDownloaderPage'));
const AudioEditor = lazy(() => import('./screens/AudioEditor'));
const MediaConverter = lazy(() => import('./screens/MediaConverter'));
const InterviewNotes = lazy(() => import('./screens/InterviewNotes'));
const StarNotes = lazy(() => import('./screens/Notes'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="App flex min-h-screen flex-col">
        {/* <StatusBar /> */}
        <Suspense fallback={<div className="min-h-screen bg-slate-700" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/ana" element={<DrkClnBrand />} />
            <Route path="/youtube-download" element={<YouTubeDownloaderPage />} />
            <Route path="/audio-edit" element={<AudioEditor />} />
            <Route path="/media-convert" element={<MediaConverter />} />
            <Route path="/interview" element={<InterviewNotes />} />
            <Route path="/star" element={<StarNotes />} />
            <Route path="/notes" element={<Navigate replace to="/star" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
