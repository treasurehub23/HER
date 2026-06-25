import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function DeliveryDispatch() {
  const { theme } = useContext(ThemeContext)

  const logs = [
    { id: "DISP-101", rider: "M. Okafor", text: "M. Okafor has completed delivery of 2 Bags of Premium Rice to Mrs. Adebayo at Ikeja Core Area Market.", msg: "I don deliver the rice to landlady o" },
    { id: "DISP-102", rider: "S. Alao", text: "S. Alao has completed delivery of 5 Baskets of Plum Tomatoes to the Mama G stall at Lekki Phase 1 Node.", msg: "Mama G don collect the full tomato basket, work done" },
    { id: "DISP-103", rider: "A. Ibrahim", text: "A. Ibrahim has completed delivery of 1 Jerrycan of Red Palm Oil to Iya Salewa at Yaba Tech Hub Cluster.", msg: "Delivery completed to Iya Salewa shop" },
    { id: "DISP-104", rider: "Chidi K.", text: "Chidi K. has completed delivery of 3 Sacks of Brown Beans to Papa Jude at Oyingbo Market Stall 4.", msg: "Sacks have been dropped off with Papa Jude" },
    { id: "DISP-105", rider: "T. Jamiu", text: "T. Jamiu has completed delivery of 10 Bags of White Premium Garri to Alhaja Rasheedat at Balogun Square.", msg: "Alhaja signed the delivery slip, everything complete" },
    { id: "DISP-106", rider: "E. Benson", text: "E. Benson has completed delivery of 4 Cartons of Vegetable Oil to Sister Blessing at Oshodi Underbridge Hub.", msg: "Goods delivered successfully to Sister Blessing" },
    { id: "DISP-107", rider: "M. Okafor", text: "M. Okafor has completed delivery of 1 Bag of Semolina to Mummy Ayo at Mushin Wholesale Terminal.", msg: "Semolina drop off done with Mummy Ayo" }
  ]

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: '"Times New Roman", Times, serif' }}>
      <div style={{ paddingBottom: '16px', borderBottom: `1px solid ${theme.border}`, marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Delivery Dispatch Log</h1>
        <p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>
          Real-time delivery fulfillment timeline. When a rider chats the WhatsApp bot to confirm arrival, the system logs the entry and marks it closed.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {logs.map((log) => (
          <div key={log.id} style={{ 
            backgroundColor: theme.surface, 
            border: `1px solid ${theme.border}`, 
            padding: '20px', 
            borderRadius: '4px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', color: theme.textMuted, fontWeight: 'bold' }}>Trip Reference: {log.id}</span>
              <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '4px 10px', backgroundColor: '#10b98122', color: '#10b981', borderRadius: '3px' }}>
                Completed
              </span>
            </div>
            
            <p style={{ fontSize: '15px', margin: '0 0 10px 0', lineHeight: '1.4' }}>{log.text}</p>

            <div style={{ backgroundColor: theme.bg, padding: '8px 12px', borderLeft: '3px solid #10b981', fontSize: '13px', color: theme.textMuted, fontStyle: 'italic' }}>
              💬 Bot Chat Tracing: "{log.msg}" ➔ Marked Completed.
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}