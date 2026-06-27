import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../App'
import { getSales } from '../api/index'

const dummySections = [
  {
    date: "23-06-2026",
    items: [
      { time: "05:14 PM", desc: "Rice Premium Bag (50kg)", qty: 2, value: "₦36,000", phone: "08012345678" },
      { time: "11:15 AM", desc: "Plum Tomato Basket", qty: 5, value: "₦7,500", phone: "08087654321" }
    ]
  },
  {
    date: "22-06-2026",
    items: [
      { time: "01:45 PM", desc: "Red Palm Oil Jerrycan (25L)", qty: 1, value: "₦12,000", phone: "08055556666" }
    ]
  },
  {
    date: "21-06-2026",
    items: [
      { time: "03:20 PM", desc: "Brown Beans Sack (Bulk)", qty: 3, value: "₦24,000", phone: "08011112222" }
    ]
  },
  {
    date: "20-06-2026",
    items: [
      { time: "04:55 PM", desc: "White Premium Garri Bag", qty: 10, value: "₦15,000", phone: "08099998888" }
    ]
  }
]

export default function Transactions() {
  const { theme, mode } = useContext(ThemeContext)
  const [sections, setSections] = useState(dummySections)

  useEffect(() => {
    getSales()
      .then(res => setSections(res.data))
      .catch(() => setSections(dummySections))
  }, [])

  const headerBg = mode === 'dark' ? '#1a1a1a' : '#f8fafc'

  return (
    <div style={{ fontFamily: '"Inter", "DM Sans", system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: theme.text }}>Sales Ledger</h1>
        
      </div>

      {sections.map((sec, sIdx) => (
        <div key={sIdx} style={{ marginBottom: '28px' }}>

          {/* Date badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f1f5f9',
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: '600',
            color: theme.textMuted,
            marginBottom: '10px'
          }}>
            📅 {sec.date}
          </div>

          <div style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: headerBg }}>
                  {['Time', 'Item', 'Qty', 'Amount', 'Trader Phone'].map(h => (
                    <th key={h} style={{
                      padding: '11px 16px',
                      fontSize: '11px',
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
                {sec.items.map((item, iIdx) => (
                  <tr key={iIdx} style={{
                    borderBottom: iIdx === sec.items.length - 1 ? 'none' : `1px solid ${theme.border}`,
                    backgroundColor: iIdx % 2 === 0 ? theme.surface : (mode === 'dark' ? '#0f0f0f' : '#fafafa')
                  }}>
                    <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: '12px', fontFamily: 'monospace' }}>{item.time}</td>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: theme.text }}>{item.desc}</td>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: theme.text }}>{item.qty}</td>
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#10b981', fontFamily: 'monospace' }}>{item.value}</td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '12px', color: theme.textMuted }}>{item.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}