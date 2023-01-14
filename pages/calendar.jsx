import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const Calendar = () => {

  const pageStyle = {
    display: 'flex',
    justifyContent: 'space-evenly'
  }

  const sidebarStyle = {
    backgroundColor: '#D9D9D9',
    width: '25%'
  }

  const calendarStyle = {
    width: '68%',
    marginLeft: '10px',
    marginRight: '20px',
    backgroundColor: '#D9D9D9',
    padding: '10px',
    borderRadius: '20px'
  }

  return (
    <div style={pageStyle}>
      <div style={calendarStyle}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
        />
      </div>
      <div style={sidebarStyle}>
        Sidebar
      </div>
    </div>
  )
}

export default Calendar;