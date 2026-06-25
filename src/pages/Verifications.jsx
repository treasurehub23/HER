import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function Verifications() {
  const { theme } = useContext(ThemeContext)

  const verificationLogs = [
    { 
      id: "CONF-301", 
      time: "06:12 AM", 
      type: "SUCCESS",
      details: "Payment Confirmed: Phone source 08033334444 associated with Account Number 2049118472 successfully completed a bank transfer of ₦36,000. WhatsApp sales record auto-released to ledger." 
    },
    { 
      id: "FLAG-901", 
      time: "05:14 PM", 
      type: "FRAUD",
      details: "Security Alert: Phone connection source 08012345678 associated with Account Number 3029184711 has been flagged and blocked for a fake payment scam attempt." 
    },
    { 
      id: "CONF-302", 
      time: "04:30 PM", 
      type: "SUCCESS",
      details: "Payment Confirmed: Phone source 08122223333 associated with Account Number 0076543210 successfully completed a bank transfer of ₦7,500. WhatsApp sales record auto-released to ledger." 
    },
    { 
      id: "FLAG-902", 
      time: "02:11 PM", 
      type: "FRAUD",
      details: "Security Alert: Phone connection source 08188822341 associated with Account Number 0048127399 has been flagged and blocked for a fake payment scam attempt." 
    },
    { 
      id: "CONF-303", 
      time: "01:15 PM", 
      type: "SUCCESS",
      details: "Payment Confirmed: Phone source 07066667777 associated with Account Number 3112048599 successfully completed a bank transfer of ₦12,000. WhatsApp sales record auto-released to ledger." 
    },
    { 
      id: "FLAG-903", 
      time: "09:40 AM", 
      type: "FRAUD",
      details: "Security Alert: Phone connection source 07055566612 associated with Account Number 2110482273 has been flagged and blocked for a fake payment scam attempt." 
    }
  ]

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: '"Times New Roman", Times, serif' }}>
      <div style={{ paddingBottom: '16px', borderBottom: `1px solid ${theme.border}`, marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Payment Status Check</h1>
        <p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>
          Monitors incoming text communications against real bank references to automatically clear honest customer transactions and catch fraudulent alerts.
        </p>
      </div>

      {/* Summary Metrics Banner */}
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '24px' }}>
        <div style={{ padding: '16px', backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderLeft: '4px solid #10b981' }}>
          <span style={{ fontSize: '12px', color: theme.textMuted, textTransform: 'uppercase' }}>Cleared Payments Today</span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#10b981' }}>3 Transfers Confirmed</h3>
        </div>
        <div style={{ padding: '16px', backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderLeft: '4px solid #ef4444' }}>
          <span style={{ fontSize: '12px', color: theme.textMuted, textTransform: 'uppercase' }}>Scams Stopped Today</span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#ef4444' }}>3 Fake Alerts Blocked</h3>
        </div>
      </div>

      {/* Interactive Log Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {verificationLogs.map((res) => {
          const isSuccess = res.type === "SUCCESS"
          return (
            <div 
              key={res.id} 
              style={{ 
                padding: '16px', 
                backgroundColor: theme.surface, 
                border: `1px solid ${theme.border}`, 
                borderLeft: `4px solid ${isSuccess ? '#10b981' : '#ef4444'}` 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong style={{ color: isSuccess ? '#10b981' : '#ef4444', fontSize: '14px' }}>
                  {isSuccess ? `✅ Payment Confirmed (${res.time})` : `🚨 Security Alert Interrupt (${res.time})`}
                </strong>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: theme.textMuted }}>{res.id}</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>{res.details}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}