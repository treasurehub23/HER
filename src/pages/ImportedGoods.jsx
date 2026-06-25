import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function ImportedGoods() {
  const { theme } = useContext(ThemeContext)

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: '"Times New Roman", Times, serif' }}>
      <div style={{ paddingBottom: '16px', borderBottom: `1px solid ${theme.border}`, marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Imported Goods Tracker</h1>
        <p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>Track bulk wholesale orders ordered from external supply chains coming into the local warehouses.</p>
      </div>

      <div style={{ padding: '16px', backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Apapa Port Warehouse Shipment</h3>
        <p style={{ margin: 0, fontSize: '14px', color: theme.textMuted }}>
          Bulk shipment containing 14,000 kg of agricultural stock compounds has been approved and cleared for offloading.
        </p>
      </div>
    </div>
  )
}