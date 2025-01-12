// App.jsx (example)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Wudi2025W from './components/Wudi2025W';  // <-- import the new component/route

function App() {
  return (
    <Router>
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<Main />} />

        {/* The new route for WUDI 2025 Winter League */}
        <Route path="/wudi-2025-w" element={<Wudi2025W />} />
      </Routes>
    </Router>
  );
}

export default App;
