import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Alerts from './pages/Alerts'
import Transactions from './pages/Transactions'
import Inventory from './pages/Inventory'

export const ThemeContext = createContext()

function App() {
  const [mode, setMode] = useState('dark')

  const themes = {
    dark: {
      bg: '#0a0a0a',
      surface: '#111111',
      cardBg: '#111111',
      border: '#222222',
      text: '#ffffff',
      textMuted: '#a3a3a3',
      accent: '#f59e0b',
      gridLine: '#222222'
    },
    light: {
      bg: '#f8fafc',
      surface: '#ffffff',
      border: '#e2e8f0',
      text: '#0f172a',
      textMuted: '#64748b',
      accent: '#d97706',
      gridLine: '#e2e8f0',
      cardBg: '#f1f5f9'
    }
  }

  const currentTheme = themes[mode]

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, mode, setMode }}>
      <BrowserRouter>
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: currentTheme.bg,
          fontFamily: '"Inter", "DM Sans", system-ui, sans-serif',
          transition: 'all 0.15s ease'
        }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar />
            <main style={{
              flex: 1,
              padding: '24px',
              width: '100%',
              overflowX: 'hidden',
              backgroundColor: currentTheme.bg
            }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/inventory" element={<Inventory />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App