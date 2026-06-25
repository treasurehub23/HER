import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../App'

const menuItems = [
  { path: '/', label: 'Overview Dashboard', icon: '📊' },
  { path: '/verifications', label: 'Payment Status Check', icon: '🚨' },
  { path: '/transactions', label: 'Sales Ledger Feed', icon: '📝' },
  { path: '/imported', label: 'Imported Goods Tracker', icon: '🚢' },
  { path: '/delivery', label: 'Delivery Dispatch Log', icon: '🚚' },
  { path: '/inventory', label: 'Stock Levels & Ledger', icon: '🗄️' },
  { path: '/credit', label: 'Credit Score Pipeline', icon: '🏦' }
]

function Sidebar() {
  const { theme, mode, setMode } = useContext(ThemeContext)
  const location = useLocation()

  return (
    <div style={{
      width: '260px',
      backgroundColor: theme.surface,
      borderRight: `1px solid ${theme.border}`,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      fontFamily: '"Times New Roman", Times, serif',
      transition: 'background-color 0.15s ease, border-color 0.15s ease'
    }}>
      
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${theme.border}` }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: theme.text, margin: 0, letterSpacing: '0.5px' }}>
          LUMIRA
        </h2>
        <span style={{ fontSize: '12px', color: theme.textMuted, fontStyle: 'italic' }}>WhatsApp Ledger Engine</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: active ? 'bold' : 'normal',
                color: active ? '#ffffff' : theme.text,
                backgroundColor: active ? (theme.accent || '#bddd0d') : 'transparent',
                transition: 'all 0.1s ease'
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <button 
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '4px',
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.bg,
            color: theme.text,
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            fontFamily: '"Times New Roman", Times, serif',
            textTransform: 'uppercase'
          }}
        >
          {mode === 'dark' ? '☀️ Activate Light Mode' : '🌙 Activate Dark Mode'}
        </button>
      </div>
    </div>
  )
}

export default Sidebar