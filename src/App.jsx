import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Verifications from './pages/Verifications'
import Transactions from './pages/Transactions'
import ImportedGoods from './pages/ImportedGoods'
import DeliveryDispatch from './pages/DeliveryDispatch'
import StockLedger from './pages/StockLedger'
import CreditPipeline from './pages/CreditPipeline'

export const ThemeContext = createContext()

function App() {
  const [mode, setMode] = useState('dark')

  const themes = {
    dark: {
      bg: '#000000',       
      surface: '#000000',  
      cardBg: '#000000',   
      border: '#222222',  
      text: '#ffffff',     // Clear white
      textMuted: '#a3a3a3',
      accent: '#f59e0b',   
      gridLine: '#222222'
    },
    light: {
      bg: '#ffffff',
      surface: '#f8fafc',
      border: '#cbd5e1',
      text: '#0f172a',
      textMuted: '#475569',
      accent: '#d97706',
      gridLine: '#cbd5e1',
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
          color: currentTheme.text,
          fontFamily: '"Times New Roman", Times, serif',
          transition: 'background-color 0.15s ease, color 0.15s ease'
        }}>
          <Sidebar />
          <main style={{ 
            flex: 1, 
            padding: '24px', 
            width: '100%', 
            overflowX: 'hidden',
            backgroundColor: currentTheme.bg // Forces main viewport to lock to pure black
          }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/verifications" element={<Verifications />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/imported" element={<ImportedGoods />} />
              <Route path="/delivery" element={<DeliveryDispatch />} />
              <Route path="/inventory" element={<StockLedger />} />
              <Route path="/credit" element={<CreditPipeline />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App