import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function StatCard({ label, value, sub, alert }) {
  const { theme } = useContext(ThemeContext)

  return (
    <div style={{
      padding: '20px 24px',
      backgroundColor: theme.surface,
      border: `1px solid ${theme.border}`,
      borderLeft: alert ? '4px solid #ef4444' : `4px solid ${theme.accent}`
    }}>
      <span style={{
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: theme.textMuted,
        fontWeight: 'bold',
        display: 'block',
        marginBottom: '6px'
      }}>
        {label}
      </span>

      <span style={{
        fontSize: '26px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: alert ? '#ef4444' : theme.text,
        display: 'block'
      }}>
        {value}
      </span>

      {sub && (
        <span style={{
          fontSize: '12px',
          fontStyle: 'italic',
          color: theme.textMuted,
          display: 'block',
          marginTop: '4px'
        }}>
          {sub}
        </span>
      )}
    </div>
  )
}