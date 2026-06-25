import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../App'

const categorizedStockRegistry = [
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

function Inventory() {
  const { theme } = useContext(ThemeContext)
  const [registry, setRegistry] = useState(categorizedStockRegistry)

  const cellStyle = {
    padding: '12px',
    fontSize: '13px',
    borderBottom: `1px solid ${theme.border}`,
    textAlign: 'left'
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Stock Balances Registry <span style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: '14px', color: theme.textMuted }}>(Categorized Goods Matrix)</span>
        </h1>
      </div>

      {registry.map((cat) => (
        <div key={cat.category} style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: theme.accent, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.03em' }}>
            📁 {cat.category}
          </h3>

          <div className="sharp-card" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, padding: '0px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: theme.bg, borderBottom: `2px solid ${theme.border}` }}>
                  <th style={{ ...cellStyle, color: theme.textMuted, fontWeight: 'bold' }}>Item Registry Description</th>
                  <th style={{ ...cellStyle, width: '200px', color: theme.textMuted, fontWeight: 'bold' }}>Available Balance</th>
                  <th style={{ ...cellStyle, width: '200px', color: theme.textMuted, fontWeight: 'bold' }}>Threshold Risk Status</th>
                </tr>
              </thead>
              <tbody>
                {cat.items.map((i) => (
                  <tr key={i.id}>
                    <td style={{ ...cellStyle, fontStyle: 'italic', fontWeight: '500' }}>{i.name}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', fontWeight: 'bold' }}>{i.quantity} Units</td>
                    <td style={{ ...cellStyle }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        border: `1px solid ${
                          i.status === 'OK' ? '#10b981' : i.status === 'LOW' ? '#f59e0b' : '#ef4444'
                        }`,
                        backgroundColor: `${
                          i.status === 'OK' ? '#10b981' : i.status === 'LOW' ? '#f59e0b' : '#ef4444'
                        }15`,
                        color: i.status === 'OK' ? '#10b981' : i.status === 'LOW' ? '#f59e0b' : '#ef4444'
                      }}>
                        {i.status}
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