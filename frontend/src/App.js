import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CodeSmells from './pages/CodeSmells'
import Layout from './layout'

const App = () => {
    return (
          <Layout>
              <Routes>
                  <Route path="/code-smells" element={<CodeSmells />} />
              </Routes>
          </Layout>
    )
}

export default App