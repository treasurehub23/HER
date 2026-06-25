import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function StockLedger() {
  const { theme, mode } = useContext(ThemeContext)

  const items = [
    { name: "Premium Rice Bags (50kg)", category: "Grains", count: "142 Bags", status: "Good Standing", color: "#10b981" },
    { name: "Plum Tomato Fresh Baskets", category: "Perishables", count: "18 Baskets", status: "Low Stock Alert", color: "#ef4444" },
    { name: "Red Palm Oil Jerrycans (25L)", category: "Oils", count: "89 Jerrycans", status: "Good Standing", color: "#10b981" },
    { name: "Brown Beans Sacks (Bulk)", category: "Grains", count: "64 Sacks", status: "Good Standing", color: "#10b981" },
    { name: "White Premium Garri Bags", category: "Grains", count: "5 Bags", status: "Critical Reorder", color: "#ef4444" },
    { name: "Vegetable Oil Cartons", category: "Oils", count: "31 Cartons", status: "Good Standing", color: "#10b981" }
  ]

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: '"Times New Roman", Times, serif' }}>
      <div style={{ paddingBottom: '16px', borderBottom: `1px solid ${theme.border}`, marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Stock Levels & Ledger</h1>
        <p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>
          Tracks available stock counts inside the storehouse. Quantities change automatically as the WhatsApp engine tallies customer sales.
        </p>
      </div>

      {/* Summary Row */}
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '24px' }}>
        <div style={{ padding: '20px', backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <span style={{ fontSize: '13px', color: theme.textMuted, textTransform: 'uppercase' }}>Total Items Monitored</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold' }}>353 Units Total</h2>
        </div>
        <div style={{ padding: '20px', backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <span style={{ fontSize: '13px', color: '#ef4444', textTransform: 'uppercase' }}>Depleted Stock Alerts</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>2 Items Restock Due</h2>
        </div>
      </div>

      {/* High-Density Ledger Table */}
      <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, padding: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${theme.border}`, color: theme.textMuted }}>
              <th style={{ padding: '14px 16px' }}>Product Inventory Line</th>
              <th style={{ padding: '14px 16px' }}>Category Group</th>
              <th style={{ padding: '14px 16px' }}>Current Storehouse Balance</th>
              <th style={{ padding: '14px 16px' }}>Warehouse Alert Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: idx === items.length - 1 ? 'none' : `1px solid ${theme.border}` }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold' }}>{item.name}</td>
                <td style={{ padding: '14px 16px', color: theme.textMuted }}>{item.category}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', fontFamily: 'monospace' }}>{item.count}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'bold', 
                    color: item.color,
                    backgroundColor: `${item.color}15`,
                    padding: '4px 8px',
                    borderRadius: '2px'
                  }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}