import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function Transactions() {
  const { theme, mode } = useContext(ThemeContext)

  const sections = [
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

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: '"Times New Roman", Times, serif' }}>
      <div style={{ paddingBottom: '16px', borderBottom: `1px solid ${theme.border}`, marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Automated Sales Ledger</h1>
        <p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>
          No matter what language a customer types into the WhatsApp bot (Pidgin, Yoruba, Igbo, Hausa, or English), the engine automatically translates and structures the final feed records into clear English below.
        </p>
      </div>

      {sections.map((sec, sIdx) => (
        <div key={sIdx} style={{ marginBottom: '32px' }}>
          
          <div style={{ 
            backgroundColor: '#000000', 
            color: '#ffffff',
            padding: '6px 12px', 
            fontSize: '13px', 
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '10px'
          }}>
            📅 {sec.date}
          </div>

          <div style={{ 
            backgroundColor: theme.cardBg, 
            border: `1px solid ${theme.border}`, 
            borderRadius: '0px',
            overflowX: 'auto',
            padding: '4px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${theme.border}`, color: theme.textMuted }}>
                  <th style={{ padding: '14px 16px' }}>Date / Timestamp</th>
                  <th style={{ padding: '14px 16px' }}>Inventory Item Description</th>
                  <th style={{ padding: '14px 16px' }}>Quantity</th>
                  <th style={{ padding: '14px 16px' }}>Settlement Value</th>
                  <th style={{ padding: '14px 16px' }}>Source Phone</th>
                </tr>
              </thead>
              <tbody>
                {sec.items.map((item, iIdx) => (
                  <tr key={iIdx} style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <td style={{ padding: '16px', color: theme.textMuted }}>
                      <div>{sec.date}</div>
                      <div style={{ fontSize: '12px' }}>({item.time})</div>
                    </td>
                    <td style={{ padding: '16px', fontWeight: 'bold', fontStyle: 'italic' }}>{item.desc}</td>
                    <td style={{ padding: '16px', fontWeight: 'bold' }}>{item.qty}</td>
                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#d97706' }}>{item.value}</td>
                    <td style={{ padding: '16px', fontFamily: 'monospace' }}>{item.phone}</td>
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