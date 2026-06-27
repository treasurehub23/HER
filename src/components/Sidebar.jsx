import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../App'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/alerts', label: 'Payment Verifications', icon: '🚨' },
  { path: '/transactions', label: 'Sales Ledger', icon: '📝' },
  { path: '/inventory', label: 'Inventory', icon: '🗄️' }
]

function Sidebar() {
  const { theme, mode, setMode } = useContext(ThemeContext)
  const location = useLocation()
  const isDark = mode === 'dark'

  return (
    <div style={{
      width: '240px',
      minWidth: '240px',
      backgroundColor: isDark ? '#0d0d0d' : '#ffffff',
      borderRight: `1px solid ${theme.border}`,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      fontFamily: '"Inter", "DM Sans", system-ui, sans-serif',
      minHeight: '100vh'
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '32px', paddingBottom: '20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#f59e0b',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#000'
          }}>L</div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: theme.text, margin: 0, letterSpacing: '-0.3px' }}>
            Lumira
          </h2>
        </div>
        <span style={{ fontSize: '11px', color: theme.textMuted, marginLeft: '42px' }}>WhatsApp Business OS</span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: active ? '600' : '400',
                color: active ? '#ffffff' : theme.textMuted,
                backgroundColor: active ? '#f59e0b' : 'transparent',
                transition: 'all 0.1s ease'
              }}
            >
              <span style={{ fontSize: '15px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Theme toggle */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: `1px solid ${theme.border}` }}>
        <button
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: `1px solid ${theme.border}`,
            backgroundColor: 'transparent',
            color: theme.textMuted,
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            fontFamily: '"Inter", system-ui, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {mode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </div>
  )
}

export default Sidebar