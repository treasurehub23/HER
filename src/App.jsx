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
      bg: 'transparent',    // Changed to transparent so the background image shows through!
      surface: '#000000',  
      cardBg: '#000000',   
      border: '#222222',  
      text: '#ffffff',     
      textMuted: '#a3a3a3',
      accent: '#f59e0b',   
      gridLine: '#222222'
    },
    light: {
      bg: 'transparent',    // Changed to transparent so the background image shows through!
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
  const backgroundImageURL = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920"

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, mode, setMode }}>
      <BrowserRouter>
        {/* Main Wrapper with Background Image */}
        <div style={{ 
          display: 'flex', 
          minHeight: '100vh', 
          backgroundImage: `url(${backgroundImageURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          fontFamily: '"Times New Roman", Times, serif',
          transition: 'all 0.15s ease'
        }}>
          
          {/* Smart Blend Overlay: Dims the image dynamically based on mode */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // Uses 0.94 opacity so the background texture is highly subtle and doesn't conflict with text readability
            backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.94)' : 'rgba(255, 255, 255, 0.96)',
            zIndex: 1,
            pointerEvents: 'none', 
            transition: 'background-color 0.15s ease'
          }} />

          {/* Content Container (Elevated above the overlay using zIndex) */}
          <div style={{ display: 'flex', width: '100%', zIndex: 2 }}>
            <Sidebar />
            <main style={{ 
              flex: 1, 
              padding: '24px', 
              width: '100%', 
              overflowX: 'hidden'
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

        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App