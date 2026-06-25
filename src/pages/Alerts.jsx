import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../App'
import { getAlerts } from '../api/index'

const dummyAlerts = [
  { id: 1, trader: '08012345678', text: 'GTBank alert: ₦50,000 from Emeka Obi', verdict: 'REAL', time: '10:01am' },
  { id: 2, trader: '08087654321', text: 'OPay credit alert ₦20,000 value date 30/06 [Fake Metadata Flag]', verdict: 'FAKE', time: '12:30pm' },
  { id: 3, trader: '08055556666', text: 'Moniepoint: ₦15,000 received from Chioma', verdict: 'REAL', time: '2:10pm' },
]

function Alerts() {
  const { theme } = useContext(ThemeContext)
  const [alerts, setAlerts] = useState(dummyAlerts)

  const cellStyle = {
    padding: '10px 12px',
    fontSize: '13px',
    borderBottom: `1px solid ${theme.border}`,
    textAlign: 'left'
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Payment Verifications <span style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: '14px', color: theme.textMuted }}>(Lumira Fraud Shield Audit Logs)</span>
        </h1>
      </div>

      <div className="sharp-card" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, padding: '0px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: theme.bg, borderBottom: `2px solid ${theme.border}` }}>
              <th style={{ ...cellStyle, color: theme.textMuted, fontWeight: 'bold' }}>Merchant Source Node</th>
              <th style={{ ...cellStyle, color: theme.textMuted, fontWeight: 'bold' }}>Forwarded Media Content</th>
              <th style={{ ...cellStyle, color: theme.textMuted, fontWeight: 'bold' }}>Security Status</th>
              <th style={{ ...cellStyle, color: theme.textMuted, fontWeight: 'bold' }}>Interval</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(a => (
              <tr key={a.id}>
                <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{a.trader}</td>
                <td style={{ ...cellStyle, fontStyle: 'italic' }}>"{a.text}"</td>
                <td style={{ ...cellStyle }}>
                  <span style={{
                    background: a.verdict === 'REAL' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    color: a.verdict === 'REAL' ? '#10b981' : '#ef4444',
                    border: `1px solid ${a.verdict === 'REAL' ? '#10b981' : '#ef4444'}`,
                    padding: '2px 6px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    borderRadius: '2px'
                  }}>
                    {a.verdict}
                  </span>
                </td>
                <td style={{ ...cellStyle, fontFamily: 'monospace', color: theme.textMuted }}>{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Alerts