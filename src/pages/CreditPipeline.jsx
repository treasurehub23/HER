import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function CreditPipeline() {
  const { theme } = useContext(ThemeContext)

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: '"Times New Roman", Times, serif' }}>
      <div style={{ paddingBottom: '16px', borderBottom: `1px solid ${theme.border}`, marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Credit Score Pipeline</h1>
        <p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>Calculates reliable merchant history automatically based on their daily WhatsApp sales activity.</p>
      </div>

      <div style={{ padding: '20px', backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Ecosystem Status Profile: Approved</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          This merchant has logged continuous transaction data over the past month with zero fraud warnings, qualifying them for micro-stock credit loans.
        </p>
      </div>
    </div>
  )
}