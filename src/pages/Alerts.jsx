import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../App'
import { getAlerts } from '../api/index'

const dummyAlerts = [
  { id: 1, trader: '08012345678', text: 'GTBank alert: ₦50,000 from Emeka Obi', verdict: 'REAL', time: '10:01am' },
  { id: 2, trader: '08087654321', text: 'OPay credit alert ₦20,000 value date 30/06 [Fake Metadata Flag]', verdict: 'FAKE', time: '12:30pm' },
  { id: 3, trader: '08055556666', text: 'Moniepoint: ₦15,000 received from Chioma', verdict: 'REAL', time: '2:10pm' },
  { id: 4, trader: '08033334444', text: 'GTBank: ₦36,000 sent by Alhaji Musa', verdict: 'REAL', time: '3:45pm' },
  { id: 5, trader: '08188822341', text: 'Access Bank credit ₦120,000 value date 01/07 pending', verdict: 'FAKE', time: '4:52pm' },
]

function Alerts() {
  const { theme, mode } = useContext(ThemeContext)
  const [alerts, setAlerts] = useState(dummyAlerts)

  useEffect(() => {
    getAlerts()
      .then(res => setAlerts(res.data))
      .catch(() => setAlerts(dummyAlerts))
  }, [])

  const headerBg = mode === 'dark' ? '#1a1a1a' : '#f8fafc'

  const real = alerts.filter(a => a.verdict === 'REAL').length
  const fake = alerts.filter(a => a.verdict === 'FAKE').length

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: '"Inter", "DM Sans", system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: theme.text }}>Payment Verifications</h1>
        <p style={{ fontSize: '14px', color: theme.textMuted, margin: 0 }}>
          Every alert forwarded to the WhatsApp bot is scanned and logged here instantly.
        </p>
      </div>

      {/* Summary pills */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          padding: '12px 20px',
          backgroundColor: 'rgba(16,185,129,0.1)',
          border: '1px solid #10b981',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>✅</span>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>{real} Cleared</div>
            <div style={{ fontSize: '11px', color: theme.textMuted }}>Real payments</div>
          </div>
        </div>
        <div style={{
          padding: '12px 20px',
          backgroundColor: 'rgba(239,68,68,0.1)',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>🚫</span>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#ef4444' }}>{fake} Blocked</div>
            <div style={{ fontSize: '11px', color: theme.textMuted }}>Fake alerts caught</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: headerBg }}>
              {['Trader Phone', 'Alert Message', 'Status', 'Time'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: theme.textMuted,
                  textAlign: 'left',
                  borderBottom: `1px solid ${theme.border}`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alerts.map((a, idx) => (
              <tr key={a.id} style={{
                backgroundColor: idx % 2 === 0 ? theme.surface : (mode === 'dark' ? '#0f0f0f' : '#fafafa'),
                borderBottom: `1px solid ${theme.border}`
              }}>
                <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '13px', color: theme.text }}>{a.trader}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: theme.text, maxWidth: '320px' }}>{a.text}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    background: a.verdict === 'REAL' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    color: a.verdict === 'REAL' ? '#10b981' : '#ef4444',
                    border: `1px solid ${a.verdict === 'REAL' ? '#10b981' : '#ef4444'}`,
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: '600',
                    borderRadius: '20px'
                  }}>
                    {a.verdict === 'REAL' ? '✅ Real' : '❌ Fake'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '12px', color: theme.textMuted }}>{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Alerts