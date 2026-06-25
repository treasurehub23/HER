import { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '../App'

function Dashboard() {
  const { theme, mode } = useContext(ThemeContext)
  const location = useLocation()
  const [traderIdentity, setTraderIdentity] = useState("Global Analytics Terminal (Demo)")
  
  // Interactive Coordinate Pointers
  const [activeDayIdx, setActiveDayIdx] = useState(3) // Monday-Sunday pointer
  const [activeMonthIdx, setActiveMonthIdx] = useState(5) // January-December pointer

  // 1. WEEKLY TIME-SERIES CURVE (DOMINATED BY CYAN)
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

  // 2. TALL UPRIGHT MONTHLY COLUMNS (LIGHT GREEN #20cc80)
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const authToken = queryParams.get('auth')
    if (authToken) { try { setTraderIdentity(atob(authToken)) } catch (e) { } }
  }, [location])

  // Explicit Dynamic Fallbacks to bypass color collision
  const textPrimary = theme.text
  const textMuted = theme.textMuted
  const gridStroke = theme.gridLine
  const componentSurface = theme.cardBg

  return (
    <div style={{ 
      width: '100%', 
      backgroundColor: theme.bg, 
      color: textPrimary,
      fontFamily: '"Times New Roman", Times, serif',
      transition: 'all 0.15s ease'
    }}>
      
      {/* Platform Header */}
      <div style={{ padding: '24px 32px', borderBottom: `1px solid ${theme.border}` }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Summary Control Node</h1>
        <p style={{ fontSize: '13px', color: textMuted, fontStyle: 'italic', margin: '4px 0 0 0' }}>
          Active Node Stream: <span style={{ fontFamily: 'monospace', color: textPrimary, fontWeight: 'bold' }}>{traderIdentity}</span>
        </p>
      </div>

      {/* THE 4 COUNTERS SECTION */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        borderBottom: `1px solid ${theme.border}`,
        backgroundColor: theme.surface
      }}>
        {[
          { label: "Total Processed Volume", figure: "₦2,132,000", note: "Aggregated accounting entries" },
          { label: "Intercepted Frauds", figure: "4 Flags", note: "Latest: Fake SMS blocked", alert: true },
          { label: "Dispatched Deliveries", figure: "7 Pending", note: "Active logistics tracker" },
          { label: "Import Registry Check", figure: "12 Batches", note: "Clearing nodes streaming" }
        ].map((c, i) => (
          <div key={i} style={{ 
            padding: '20px 32px', 
            borderRight: i === 3 ? 'none' : `1px solid ${theme.border}`,
            borderBottom: '1px solid transparent'
          }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: textMuted, letterSpacing: '0.05em', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              {c.label}
            </span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', display: 'block', color: c.alert ? '#ef4444' : textPrimary }}>
              {c.figure}
            </span>
            <span style={{ fontSize: '12px', fontStyle: 'italic', color: textMuted, display: 'block', marginTop: '4px' }}>
              {c.note}
            </span>
          </div>
        ))}
      </div>

      {/* GRAPH 1: Sleek Interactive Weekly Stream Curve */}
      <div style={{ padding: '32px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Weekly Volume Delta</h3>
            <p style={{ fontSize: '12px', color: textMuted, fontStyle: 'italic', margin: '2px 0 0 0' }}>Scan point values smoothly over vector intersections</p>
          </div>
          
          <div style={{ 
            fontSize: '12px', 
            fontFamily: 'monospace', 
            backgroundColor: componentSurface, 
            color: textPrimary, 
            padding: '6px 12px', 
            border: `1px solid ${theme.border}`, 
            fontWeight: 'bold',
            borderRadius: '4px'
          }}>
            WEEK_STREAM // <span style={{ color: mode === 'light' ? '#0097a7' : '#00e5ff', fontWeight: 'bold' }}>{weeklyData[activeDayIdx].day}: {weeklyData[activeDayIdx].val}</span>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox="0 0 800 240" style={{ width: '100%', maxHeight: '240px', display: 'block' }}>
            
            {/* STATIC Y-AXIS VALUE REFERENCE LABELS */}
            <text x="10" y="44" fill={textMuted} fontSize="10" fontFamily="monospace">₦400,000</text>
            <text x="10" y="94" fill={textMuted} fontSize="10" fontFamily="monospace">₦300,000</text>
            <text x="10" y="144" fill={textMuted} fontSize="10" fontFamily="monospace">₦200,000</text>
            <text x="10" y="194" fill={textMuted} fontSize="10" fontFamily="monospace">₦100,000</text>

            {/* Matrix Coordinate Lines */}
            <line x1="65" y1="40" x2="760" y2="40" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="90" x2="760" y2="90" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="140" x2="760" y2="140" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="190" x2="760" y2="190" stroke={gridStroke} strokeWidth="1" />
            
            {/* Base Cartesian Framelines */}
            <line x1="65" y1="20" x2="65" y2="200" stroke={textPrimary} strokeWidth="1.5" />
            <line x1="65" y1="200" x2="760" y2="200" stroke={textPrimary} strokeWidth="1.5" />

            {/* Track Crosshair Indicator Line */}
            <line x1={weeklyData[activeDayIdx].x} y1="20" x2={weeklyData[activeDayIdx].x} y2="200" stroke={mode === 'light' ? '#0097a7' : '#00e5ff'} strokeWidth="1" strokeDasharray="3,3" />

            {/* Curve Intersection Vector */}
            <path d={linePathString} fill="none" stroke={mode === 'light' ? '#0097a7' : '#00e5ff'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Loop Over Domain Iterations */}
            {weeklyData.map((pt, idx) => {
              const active = idx === activeDayIdx
              return (
                <g key={pt.day} onMouseEnter={() => setActiveDayIdx(idx)} style={{ cursor: 'pointer' }}>
                  <circle cx={pt.x} cy={pt.y} r="20" fill="transparent" /> 
                  <circle cx={pt.x} cy={pt.y} r={active ? "7" : "4"} fill={active ? (mode === 'light' ? '#0097a7' : '#00e5ff') : theme.bg} stroke={mode === 'light' ? '#0097a7' : '#00e5ff'} strokeWidth="2.5" />
                  <text x={pt.x} y="218" textAnchor="middle" fill={active ? (mode === 'light' ? '#0097a7' : '#00e5ff') : textPrimary} fontSize="11" fontFamily='"Times New Roman", Times, serif' fontWeight={active ? "bold" : "normal"}>
                    {pt.day}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* GRAPH 2: Upright Interactive Tall Month Matrix Column Grid */}
      <div style={{ padding: '32px 32px 48px 32px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Annual Aggregation Blocks</h3>
            <p style={{ fontSize: '11px', color: textMuted, fontStyle: 'italic', margin: '2px 0 0 0' }}>Hover or click columns to dynamically unpack ledger entries</p>
          </div>

          <div style={{ 
            fontSize: '12px', 
            fontFamily: 'monospace', 
            backgroundColor: componentSurface, 
            color: textPrimary, 
            padding: '6px 12px', 
            border: `1px solid ${theme.border}`, 
            fontWeight: 'bold',
            borderRadius: '4px'
          }}>
            MONTH_MATRIX // <span style={{ color: '#20cc80', fontWeight: 'bold' }}>{monthlyData[activeMonthIdx].month}: {monthlyData[activeMonthIdx].value}</span>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox="0 0 840 280" style={{ width: '100%', display: 'block' }}>
            
            {/* STATIC Y-AXIS SCALE VALUE LABELS */}
            <text x="5" y="64" fill={textMuted} fontSize="10" fontFamily="monospace">₦1,000,000</text>
            <text x="5" y="114" fill={textMuted} fontSize="10" fontFamily="monospace">₦750,000</text>
            <text x="5" y="164" fill={textMuted} fontSize="10" fontFamily="monospace">₦500,000</text>
            <text x="5" y="214" fill={textMuted} fontSize="10" fontFamily="monospace">₦250,000</text>

            {/* Matrix Coordinate Lines */}
            <line x1="65" y1="60" x2="820" y2="60" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="120" x2="820" y2="120" stroke={gridStroke} strokeWidth="1" />
            <line x1="65" y1="180" x2="820" y2="180" stroke={gridStroke} strokeWidth="1" />
            
            {/* Base Cartesian Framelines */}
            <line x1="65" y1="20" x2="65" y2="240" stroke={textPrimary} strokeWidth="1.5" />
            <line x1="65" y1="240" x2="820" y2="240" stroke={textPrimary} strokeWidth="1.5" />

            {/* Render loop for columns */}
            {monthlyData.map((data, idx) => {
              const barWidth = 32
              const xCoord = 82 + (idx * 60)
              const yCoord = 240 - data.height
              const active = idx === activeMonthIdx

              return (
                <g key={data.month} onMouseEnter={() => setActiveMonthIdx(idx)} style={{ cursor: 'pointer' }}>
                  {/* High contrast dynamic translucent indicator tracking background */}
                  <rect x={xCoord - 6} y="20" width={barWidth + 12} height="220" fill={active ? `${textPrimary}18` : 'transparent'} />

                  {/* High-density layout balance pillar */}
                  <rect 
                    x={xCoord} 
                    y={yCoord} 
                    width={barWidth} 
                    height={data.height} 
                    fill={active ? '#20cc80' : (mode === 'light' ? '#1da76d' : '#20cc80bb')} 
                    style={{ transition: 'fill 0.1s ease' }}
                  />

                  {/* Domain Calendar Markers */}
                  <text 
                    x={xCoord + (barWidth / 2)} 
                    y="258" 
                    textAnchor="middle" 
                    fill={active ? (mode === 'light' ? '#1da76d' : '#20cc80') : textPrimary} 
                    fontSize="11" 
                    fontFamily='"Times New Roman", Times, serif' 
                    fontWeight={active ? "bold" : "normal"}
                  >
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