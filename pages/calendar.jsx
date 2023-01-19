import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PrivateEvent from '../src/calendar/privateEvent.jsx';
import EditMeeting from '../src/calendar/meetingForm.jsx';
import Request from '../src/calendar/requestChange.jsx';
import NavBar from '../src/navBar';
import axios from 'axios';

import { useSession } from "next-auth/react";

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
  let [companyLogin, updateCompanyLogin] = useState(false);
  let [events, updateEvents] = useState([]);
  let [creatingEvent, updateCreating] = useState(false);
  let [editMode, updateEditMode] = useState(false);
  let [requestMode, updateRequestMode] = useState(false);

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
  let [whom, updateWhom] = useState('');
  let [notificationUser, updateNotificationUser] = useState(0);

  const { status, data } = useSession();

  const loadEvents = () => {
    console.log(data);
    let params = {};
    console.log('Loading Events for User: ' + data.user.id);
    if (companyLogin) {
      params.company_id = data.user.id;
    } else {
      params.seeker_id = data.user.id;
    }
    axios.get('http://localhost:3001/meetings', { params })
      .then(res => res.data)
      .then(data => {
        data.forEach(event => {
          event.start = new Date(event.start_time);
          event.end = new Date(event.end_time);
          event.read_start = event.start;
          event.read_end = event.end;
          event.meeting_id = event.id;
          if (event.Application) {
            if (companyLogin) {
              event.notes = event.Application.company_notes;
              event.whom = event.Application.User.first_name + ' ' + event.Application.User.last_name;
            } else {
              event.notes = event.Application.seeker_notes;
            }
          }
        })
        updateEvents(data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    loadEvents()
  }, []);

  useEffect(() => {
    if (event._def) {
      if (companyLogin) {
        updateNotificationUser(event._def.extendedProps.seeker_id);
      } else {
        updateNotificationUser(event._def.extendedProps.company_id);
      }
      if (!event._def.extendedProps.application_id) {
        updateJob('');
      } else {
        updateJob(event._def.extendedProps.application_id);
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
      if (!event._def.extendedProps.whom) {
        updateWhom('');
      } else {
        updateWhom(event._def.extendedProps.whom);
      }
      updatePrivatEvent(event._def.extendedProps.private);
      updateStart(event._def.extendedProps.read_start.getStringTime());
      updateEnd(event._def.extendedProps.read_end.getStringTime(true));
      updateStartTime(event._def.extendedProps.read_start);
      updateEndTime(event._def.extendedProps.read_end);
      updateDate(event._def.extendedProps.read_end.getStringName());
      updateEventId(event._def.extendedProps.meeting_id);
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

  const toggleCreate = () => {
    if (!creatingEvent) {
      updateCreating(true);
    }
  }

  const declineMeeting = () => {
    axios.patch('http://localhost:3001/meeting', {
        id: eventId,
        canceled: true
      })
    .then(() => loadEvents())
  }

  const acceptMeeting = () => {
    let params = {
      id: eventId,
      start_time: startTime.toString(),
      end_time: endTime.toString(),
      description: description,
      title: title,
      seeker_accepted: true,
      canceled: false
    }
    axios.patch('http://localhost:3001/meeting', params)
    .then(() => loadEvents())
  }

  const pageStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    fontFamily: 'Lora',
    marginTop: '15px'
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
    <div>
      <NavBar />
    <div style={pageStyle}>
      <div style={calendarStyle} className='calendar'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={eventClick}
          customButtons={{create: {text: 'Create Event', click: toggleCreate}}}
          headerToolbar={{
            right: 'create today prev,next',
            center: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
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
                {whom + ' has accepted'}
              </p>
              }
              {!event._def.extendedProps.seeker_accepted &&
              <p>
                <HelpIcon sx={{marginRight: '5px', fontSize: 'large'}}/>
                {'Waiting on ' + whom + ' to accept'}
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
                acceptMeeting();
              }}>Accept</Button>
              <Button sx={buttonStyle} variant="contained" onClick={e => {
                e.preventDefault();
                declineMeeting();
                updateEventSelected(false);
              }}>Decline</Button>
              </div>
              <Button sx={{backgroundColor: '#E44F48', width: '80%', marginRight: 'auto', marginLeft: 'auto', "&:hover": {backgroundColor: '#c8453e'}}} variant="contained" onClick={e => {
                e.preventDefault();
                updateRequestMode(true);
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
          {/* {job !== '' && <h2>Related Job:</h2>}
          {job !== '' && <p>{job}</p>} */}
          <h2 style={sidebarTitle}>Description</h2>
          <p style={sidebarText}>{description}</p>
          {job !== '' && <h2 style={sidebarTitle}>Application Notes</h2>}
          {job !== '' && <p style={sidebarText}>{notes}</p>}
        </div>
        }
      </div>
      <PrivateEvent visible={creatingEvent} updateVisible={updateCreating} updateEvents={loadEvents}/>
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
      seeker_id={notificationUser}
      company={companyLogin}
      updateEvents={loadEvents}/>
      <Request visible={requestMode} updateVisible={updateRequestMode} company_id={notificationUser} title={title}/>
    </div>
    </div>
  )
}

export default Calendar;

