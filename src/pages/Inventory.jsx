import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../App'
import { getInventory } from '../api/index'

const dummyInventory = [
  {
    category: "Grains & Provisions",
    items: [
      { id: 1, name: 'Rice Premium Bag (50kg)', quantity: 14, status: 'OK' },
      { id: 4, name: 'Brown Beans Sack (Bulk)', quantity: 1, status: 'CRITICAL' },
      { id: 5, name: 'White Premium Garri Bag', quantity: 22, status: 'OK' }
    ]
  },
  {
    category: "Fresh Produce & Edibles",
    items: [
      { id: 2, name: 'Plum Tomato Basket', quantity: 3, status: 'LOW' }
    ]
  },
  {
    category: "Oils & Liquids",
    items: [
      { id: 3, name: 'Red Palm Oil Jerrycan (25L)', quantity: 8, status: 'OK' },
      { id: 6, name: 'Refined Groundnut Oil (25L)', quantity: 2, status: 'LOW' }
    ]
  }
]

const statusColor = {
  OK: '#10b981',
  LOW: '#f59e0b',
  CRITICAL: '#ef4444'
}

function Inventory() {
  const { theme, mode } = useContext(ThemeContext)
  const [registry, setRegistry] = useState(dummyInventory)

  useEffect(() => {
    getInventory()
      .then(res => setRegistry(res.data))
      .catch(() => setRegistry(dummyInventory))
  }, [])

  const headerBg = mode === 'dark' ? '#1a1a1a' : '#f8fafc'

  const allItems = dummyInventory.flatMap(c => c.items)
  const okCount = allItems.filter(i => i.status === 'OK').length
  const lowCount = allItems.filter(i => i.status === 'LOW').length
  const criticalCount = allItems.filter(i => i.status === 'CRITICAL').length

  return (
    <div style={{ fontFamily: '"Inter", "DM Sans", system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: theme.text }}>Inventory</h1>
        <p style={{ fontSize: '14px', color: theme.textMuted, margin: 0 }}>
          Stock levels updated automatically as sales are recorded via WhatsApp.
        </p>
      </div>

      {/* Summary pills */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {[
          { label: 'In Stock', count: okCount, color: '#10b981' },
          { label: 'Low Stock', count: lowCount, color: '#f59e0b' },
          { label: 'Critical', count: criticalCount, color: '#ef4444' }
        ].map(s => (
          <div key={s.label} style={{
            padding: '10px 18px',
            backgroundColor: `${s.color}12`,
            border: `1px solid ${s.color}`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '700', color: s.color }}>{s.count}</span>
            <span style={{ fontSize: '12px', color: theme.textMuted }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Tables per category */}
      {registry.map((cat) => (
        <div key={cat.category} style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: '600',
            color: theme.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '10px'
          }}>
            📁 {cat.category}
          </h3>

          <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: headerBg }}>
                  {['Item', 'Quantity', 'Status'].map(h => (
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
                {cat.items.map((i, idx) => (
                  <tr key={i.id} style={{
                    borderBottom: idx === cat.items.length - 1 ? 'none' : `1px solid ${theme.border}`,
                    backgroundColor: idx % 2 === 0 ? theme.surface : (mode === 'dark' ? '#0f0f0f' : '#fafafa')
                  }}>
                    <td style={{ padding: '14px 16px', fontWeight: '500', color: theme.text }}>{i.name}</td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: '600', color: theme.text }}>{i.quantity} units</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        border: `1px solid ${statusColor[i.status]}`,
                        backgroundColor: `${statusColor[i.status]}12`,
                        color: statusColor[i.status]
                      }}>
                        {i.status === 'OK' ? '✅ OK' : i.status === 'LOW' ? '⚠️ Low' : '🔴 Critical'}
                      </span>
                    </td>
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

export default Inventory