import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function AlertBadge({ verdict }) {
  const { theme } = useContext(ThemeContext)

  const isReal = verdict === 'REAL'
  const color = isReal ? '#10b981' : '#ef4444'
  const label = isReal ? '✅ REAL' : '❌ FAKE'

  return (
    <span style={{
      fontSize: '11px',
      fontWeight: 'bold',
      padding: '3px 8px',
      border: `1px solid ${color}`,
      backgroundColor: `${color}15`,
      color: color,
      borderRadius: '2px',
      fontFamily: 'monospace'
    }}>
      {label}
    </span>
  )
}