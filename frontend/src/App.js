import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CodeSmells from './pages/CodeSmells'

const App = () => {
    return (
          <Routes>
              <Route path="/code-smells" element={<CodeSmells />} />
              <Route path="/" element={<Navigate to="/code-smells" />} />
          </Routes>
    )
}

export default App