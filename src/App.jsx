import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import Demo from './screens/Demo'
import DrkClnBrand from './screens/DrkClnBrand'
import Foreclosure from './screens/Foreclosure'
import './App.scss'
import './drkcln-global.scss'
// import usePageTracking from '../src/components/usePageTracking'

function App() {
  return (
    <Router>
      <div className="App flex min-h-screen flex-col">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/ana" element={<DrkClnBrand />} />
          <Route path="/foreclosure" element={<Foreclosure />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
