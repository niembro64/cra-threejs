import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import Demo from './screens/Demo'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="App flex min-h-screen flex-col">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
