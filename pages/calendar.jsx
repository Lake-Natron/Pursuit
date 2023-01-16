import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PrivateEvent from '../src/calendar/privateEvent.jsx';
import EditMeeting from '../src/calendar/meetingForm.jsx';

Date.prototype.monthNames = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

Date.prototype.getMonthName = function() {
  return this.monthNames[this.getMonth()];
};

Date.prototype.getStringName = function () {
  return this.getMonthName() + ' ' + this.getDate() + ', ' + this.getFullYear();
};

Date.prototype.getStringTime = function (includeMeridiem) {
  let minutes = this.getMinutes();
  let hours = this.getHours();
  let meridiem = ' AM';
  minutes < 10 ? minutes = '0' + minutes.toString() : minutes = minutes.toString();
  if (hours > 12) {
    hours = (hours - 12).toString();
    meridiem = ' PM'
  } else {
    hours = hours.toString();
  }
  includeMeridiem ? '' : meridiem = '';
  return hours + ':' + minutes + meridiem;
}

const { useState, useEffect } = React;

const Calendar = () => {
  let [eventSelected, updateEventSelected] = useState(false);
  let [companyLogin, updateCompanyLogin] = useState(true);
  let [events, updateEvents] = useState([]);
  let [creatingEvent, updateCreating] = useState(false);
  let [editMode, updateEditMode] = useState(false);

  // Event Specific Details
  let [event, updateEvent] = useState({});
  let [job, updateJob] = useState('');
  let [accepted, updateAccepted] = useState(false);
  let [privateEvent, updatePrivatEvent] = useState(false);
  let [description, updateDescription] = useState('');
  let [notes, updateNotes] = useState('');
  let [start, updateStart] = useState('');
  let [end, updateEnd] = useState('');
  let [date, updateDate] = useState('');
  let [eventId, updateEventId] = useState(0);
  let [title, updateTitle] = useState('');
  let [startTime, updateStartTime] = useState({});
  let [endTime, updateEndTime] = useState({});

  useEffect(() => {
    data.forEach(event => {
      event.read_start = event.start;
      event.read_end = event.end;
    })
    updateEvents(data);
  }, []);

  useEffect(() => {
    if (event._def) {
      if (!event._def.extendedProps.job) {
        updateJob('');
      } else {
        updateJob(event._def.extendedProps.job);
      }
      if (!event._def.extendedProps.description) {
        updateDescription('');
      } else {
        updateDescription(event._def.extendedProps.description);
      }
      if (!event._def.extendedProps.notes) {
        updateNotes('');
      } else {
        updateNotes(event._def.extendedProps.notes);
      }
      updatePrivatEvent(event._def.extendedProps.private);
      updateStart(event._def.extendedProps.read_start.getStringTime());
      updateEnd(event._def.extendedProps.read_end.getStringTime(true));
      updateStartTime(event._def.extendedProps.read_start);
      updateEndTime(event._def.extendedProps.read_end);
      updateDate(event._def.extendedProps.read_end.getStringName());
      updateEventId(event._def.extendedProps.id);
      updateTitle(event._def.title);
    } else {
      updateJob('');
      updatePrivatEvent(false);
    }
  }, [event])

  const eventClick = (e) => {
   updateEvent(e.event);
   updateEventSelected(true);
   updateAccepted(e.event._def.extendedProps.seeker_accepted);
  }

  // Toggle New Event Creation
  const toggleCreate = () => {
    if (!creatingEvent) {
      updateCreating(true);
    }
  }


  const pageStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    fontFamily: 'Lora'
  }

  const sidebarStyle = {
    backgroundColor: '#D9D9D9',
    width: '25%',
    padding: '10px',
  }

  const calendarStyle = {
    width: '68%',
    marginLeft: '10px',
    marginRight: '20px',
    backgroundColor: '#D9D9D9',
    padding: '10px',
    borderRadius: '20px'
  }

  const sidebarTitle = {
    color: '#E44F48',
    fontFamily: 'Montserrat'
  }

  const sidebarText = {
    backgroundColor: '#CFCFCF',
    borderRadius: '20px',
    padding: '10px'
  }

  const buttonStyle = {
    backgroundColor: '#E44F48',
    "&:hover": {
      backgroundColor: '#c8453e',
    },
    color:'white'
  }

  return (
    <div style={pageStyle}>
      <div style={calendarStyle} className='calendar'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={eventClick}
          customButtons={{create: {text: 'Create Event', click: toggleCreate}}}
          headerToolbar={{center: 'create'}}
        />
      </div>
      <div style={sidebarStyle}>
        {!eventSelected &&
        <h1 style={sidebarTitle}>No Meeting Selected</h1>
        }
        {eventSelected &&
        <div>
          <h1 style={sidebarTitle}>{title}</h1>
          { (companyLogin && !privateEvent) &&
            <>
              {event._def.extendedProps.seeker_accepted &&
              <p>
                <CheckCircleIcon sx={{marginRight: '5px', fontSize: 'large'}}/>
                {event._def.title + ' has accepted'}
              </p>
              }
              {!event._def.extendedProps.seeker_accepted &&
              <p>
                <HelpIcon sx={{marginRight: '5px', fontSize: 'large'}}/>
                {'Waiting on ' + event._def.title + ' to accept'}
              </p>
              }
            </>
          }
          { (!companyLogin && !accepted && !privateEvent) &&
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '5px'}}>
              <Button sx={buttonStyle} variant="contained" onClick={e => {
                e.preventDefault();
                updateAccepted(true);
                // Send Accept Request, Get another list of events
              }}>Accept</Button>
              <Button sx={buttonStyle} variant="contained" onClick={e => {
                e.preventDefault();
                // Send Decline cancellation, Get another list of events
                updateEventSelected(false);
              }}>Decline</Button>
              </div>
              <Button sx={{backgroundColor: '#E44F48', width: '80%', marginRight: 'auto', marginLeft: 'auto', "&:hover": {backgroundColor: '#c8453e'}}} variant="contained" onClick={e => {
                e.preventDefault();
              }}>Request Alternate Time</Button>
            </div>
          }
          {(privateEvent || companyLogin) && <Button sx={buttonStyle} onClick={e => {
            e.preventDefault();
            updateEditMode(true);
          }}>Edit</Button>}
          <h2>Date:</h2>
          <p>{date}</p>
          <h2>Time:</h2>
          <p>{start + ' - ' + end}</p>
          {job !== '' && <h2>Related Job:</h2>}
          {job !== '' && <p>{job}</p>}
          <h2 style={sidebarTitle}>Description</h2>
          <p style={sidebarText}>{description}</p>
          {job !== '' && <h2 style={sidebarTitle}>Application Notes</h2>}
          {job !== '' && <p style={sidebarText}>{notes}</p>}
        </div>
        }
      </div>
      <PrivateEvent visible={creatingEvent} updateVisible={updateCreating} />
      <EditMeeting visible={editMode} updateVisible={updateEditMode}
      eventId={eventId}
      description={description}
      updateDescription={updateDescription}
      start={start}
      updateStart={updateStart}
      end={end}
      updateEnd={updateEnd}
      date={date}
      updateDate={updateDate}
      title={title}
      updateTitle={updateTitle}
      startTime={startTime}
      endTime={endTime}
      updateEvents={updateEvents}/>
    </div>
  )
}

export default Calendar;

const data = [
  {
    description: 'Hello Jeff, we will use to time to interview for the role of product manager',
    title: 'Jeff Franky', //Name of company/person meeting with
    job: 'Product Manager',
    start: new Date(),//'2023-01-01T10:30:00',
    end: new Date(),//'2023-01-01T11:30:00',
    notes: 'Jeff has no experience. Do NOT hire him.',
    canceled: false,
    seeker_accepted: false,
    change_requested: false,
    request_notes: 'test',
    id: 1
  },
  {
    description: 'Let\'s use this time to chat about an opportunity I have for you',
    title: 'Grace Andrews', //Name of company/person meeting with
    job: 'Software Developer',
    start: new Date(),//'2023-01-01T10:30:00',
    end: new Date(),//'2023-01-01T11:30:00',
    notes: 'Grace has experience through a boot camp.',
    canceled: false,
    seeker_accepted: true,
    change_requested: false,
    request_notes: 'test',
    id: 2
  },
  {
    description: 'Let\'s use this time to chat about an opportunity I have for you',
    title: 'Time Reserved',
    start: new Date(),//'2023-01-01T10:30:00',
    end: new Date(),//'2023-01-01T11:30:00',
    notes: 'Grace has experience through a boot camp.',
    canceled: false,
    seeker_accepted: true,
    private: true,
    id: 3
  }
]


// Only pull meetings where cancelled is false

// Description
// id
// title
// start
// end
// notes - if seeker, pull application seeker notes. if company, pull application company notes
// seeker_accepted
// private
