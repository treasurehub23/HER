import { useState, useContext } from 'react'
import { ThemeContext } from '../App'

const defaultStats = {
  totalVolume: '₦2,132,000',
  fraudsBlocked: 4,
  totalSales: 12,
  lowStock: 2
}

function Dashboard() {
  const { theme, mode } = useContext(ThemeContext)
  const [stats] = useState(defaultStats)
  const [activeDayIdx, setActiveDayIdx] = useState(3)
  const [activeMonthIdx, setActiveMonthIdx] = useState(5)

  const weeklyData = [
    { day: 'MON', val: '₦85,000', x: 80, y: 160 },
    { day: 'TUE', val: '₦140,000', x: 190, y: 110 },
    { day: 'WED', val: '₦95,000', x: 300, y: 140 },
    { day: 'THU', val: '₦310,000', x: 410, y: 40 },
    { day: 'FRI', val: '₦180,000', x: 520, y: 80 },
    { day: 'SAT', val: '₦260,000', x: 630, y: 55 },
    { day: 'SUN', val: '₦45,000', x: 740, y: 190 }
  ]
  const linePathString = weeklyData.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  const monthlyData = [
    { month: 'JAN', value: '₦210,000', height: 45 },
    { month: 'FEB', value: '₦430,000', height: 85 },
    { month: 'MAR', value: '₦380,000', height: 75 },
    { month: 'APR', value: '₦512,000', height: 105 },
    { month: 'MAY', value: '₦680,000', height: 145 },
    { month: 'JUN', value: '₦720,000', height: 160 },
    { month: 'JUL', value: '₦650,000', height: 135 },
    { month: 'AUG', value: '₦810,000', height: 175 },
    { month: 'SEP', value: '₦790,000', height: 170 },
    { month: 'OCT', value: '₦890,000', height: 195 },
    { month: 'NOV', value: '₦950,000', height: 205 },
    { month: 'DEC', value: '₦1,100,000', height: 230 }
  ]

  const textPrimary = theme.text
  const textMuted = theme.textMuted
  const gridStroke = theme.gridLine
  const componentSurface = theme.cardBg
  const headerBg = mode === 'dark' ? '#111111' : '#f1f5f9'

  const counters = [
    {
      label: "Total Revenue",
      figure: stats.totalVolume,
      note: "All verified transactions",
      
      icon: '💰'
    },
    {
      label: "Fraud Blocked",
      figure: `${stats.fraudsBlocked} Alerts`,
      note: "Fake payments intercepted",
     
      icon: '🛡️'
    },
    {
      label: "Sales Logged",
      figure: `${stats.totalSales} Sales`,
      note: "Auto-recorded via WhatsApp",
    
      icon: '📦'
    },
    {
      label: "Low Stock Items",
      figure: `${stats.lowStock} Items`,
      note: "Need restocking soon",
      
      icon: '⚠️'
    }
  ]

  return (
    <div style={{
      width: '100%',
      backgroundColor: theme.bg,
      color: textPrimary,
      fontFamily: '"Inter", "DM Sans", system-ui, sans-serif',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: theme.text }}>Dashboard</h1>
        <p style={{ fontSize: '14px', color: textMuted, margin: 0 }}>
          Welcome to Lumira — your WhatsApp business overview
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {counters.map((c, i) => (
          <div key={i} style={{
            padding: '20px',
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            borderTop: `3px solid ${c.color}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: textMuted, fontWeight: '500' }}>{c.label}</span>
              <span style={{ fontSize: '20px' }}>{c.icon}</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: c.color, marginBottom: '4px', fontFamily: 'monospace' }}>
              {c.figure}
            </div>
            <div style={{ fontSize: '12px', color: textMuted }}>{c.note}</div>
          </div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 2px 0', color: theme.text }}>Weekly Sales</h3>
            <p style={{ fontSize: '12px', color: textMuted, margin: 0 }}>Hover over points to see daily values</p>
          </div>
          <div style={{
            fontSize: '12px',
            fontFamily: 'monospace',
            backgroundColor: componentSurface,
            color: textPrimary,
            padding: '6px 12px',
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontWeight: '600'
          }}>
            {weeklyData[activeDayIdx].day}: <span style={{ color: mode === 'light' ? '#0097a7' : '#00e5ff' }}>{weeklyData[activeDayIdx].val}</span>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox="0 0 800 240" style={{ width: '100%', maxHeight: '240px', display: 'block' }}>
            <text x="10" y="44" fill={textMuted} fontSize="10" fontFamily="monospace">₦400k</text>
            <text x="10" y="94" fill={textMuted} fontSize="10" fontFamily="monospace">₦300k</text>
            <text x="10" y="144" fill={textMuted} fontSize="10" fontFamily="monospace">₦200k</text>
            <text x="10" y="194" fill={textMuted} fontSize="10" fontFamily="monospace">₦100k</text>
            <line x1="65" y1="40" x2="760" y2="40" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="90" x2="760" y2="90" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="140" x2="760" y2="140" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="190" x2="760" y2="190" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="20" x2="65" y2="200" stroke={theme.border} strokeWidth="1.5" />
            <line x1="65" y1="200" x2="760" y2="200" stroke={theme.border} strokeWidth="1.5" />
            <line x1={weeklyData[activeDayIdx].x} y1="20" x2={weeklyData[activeDayIdx].x} y2="200" stroke={mode === 'light' ? '#0097a7' : '#00e5ff'} strokeWidth="1" strokeDasharray="3,3" />
            <path d={linePathString} fill="none" stroke={mode === 'light' ? '#0097a7' : '#00e5ff'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {weeklyData.map((pt, idx) => {
              const active = idx === activeDayIdx
              return (
                <g key={pt.day} onMouseEnter={() => setActiveDayIdx(idx)} style={{ cursor: 'pointer' }}>
                  <circle cx={pt.x} cy={pt.y} r="20" fill="transparent" />
                  <circle cx={pt.x} cy={pt.y} r={active ? "7" : "4"} fill={active ? (mode === 'light' ? '#0097a7' : '#00e5ff') : theme.surface} stroke={mode === 'light' ? '#0097a7' : '#00e5ff'} strokeWidth="2.5" />
                  <text x={pt.x} y="218" textAnchor="middle" fill={active ? (mode === 'light' ? '#0097a7' : '#00e5ff') : textMuted} fontSize="11" fontFamily="monospace" fontWeight={active ? "bold" : "normal"}>
                    {pt.day}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Monthly Chart */}
      <div style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        padding: '24px'
      }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 2px 0', color: theme.text }}>Monthly Revenue</h3>
            <p style={{ fontSize: '11px', color: textMuted, margin: 0 }}>Hover to see monthly totals</p>
          </div>
          <div style={{
            fontSize: '12px',
            fontFamily: 'monospace',
            backgroundColor: componentSurface,
            color: textPrimary,
            padding: '6px 12px',
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontWeight: '600'
          }}>
            {monthlyData[activeMonthIdx].month}: <span style={{ color: '#20cc80' }}>{monthlyData[activeMonthIdx].value}</span>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox="0 0 840 280" style={{ width: '100%', display: 'block' }}>
            <text x="5" y="64" fill={textMuted} fontSize="10" fontFamily="monospace">₦1M</text>
            <text x="5" y="114" fill={textMuted} fontSize="10" fontFamily="monospace">₦750k</text>
            <text x="5" y="164" fill={textMuted} fontSize="10" fontFamily="monospace">₦500k</text>
            <text x="5" y="214" fill={textMuted} fontSize="10" fontFamily="monospace">₦250k</text>
            <line x1="65" y1="60" x2="820" y2="60" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="120" x2="820" y2="120" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="180" x2="820" y2="180" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="20" x2="65" y2="240" stroke={theme.border} strokeWidth="1.5" />
            <line x1="65" y1="240" x2="820" y2="240" stroke={theme.border} strokeWidth="1.5" />
            {monthlyData.map((data, idx) => {
              const barWidth = 32
              const xCoord = 82 + (idx * 60)
              const yCoord = 240 - data.height
              const active = idx === activeMonthIdx
              return (
                <g key={data.month} onMouseEnter={() => setActiveMonthIdx(idx)} style={{ cursor: 'pointer' }}>
                  <rect x={xCoord - 6} y="20" width={barWidth + 12} height="220" fill={active ? `${textPrimary}10` : 'transparent'} />
                  <rect x={xCoord} y={yCoord} width={barWidth} height={data.height} fill={active ? '#20cc80' : (mode === 'light' ? '#1da76d' : '#20cc80bb')} rx="3" style={{ transition: 'fill 0.1s ease' }} />
                  <text x={xCoord + (barWidth / 2)} y="258" textAnchor="middle" fill={active ? (mode === 'light' ? '#1da76d' : '#20cc80') : textMuted} fontSize="10" fontFamily="monospace" fontWeight={active ? "bold" : "normal"}>
                    {data.month}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

    </div>
  )
}

export default Dashboard