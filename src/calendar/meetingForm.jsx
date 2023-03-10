import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';


const { useState, useEffect } = React;

const EditMeeting = ({ visible, updateVisible, start, end, description, updateDescription, updateStart, updateEnd, title, updateTitle, eventId, updateDate, startTime, endTime, updateEvents, seeker_id, company, privateEvent }) => {
  let [newStart, updateNewStart] = useState(startTime);
  let [newEnd, updateNewEnd] = useState(endTime);
  let [newDesc, updateNewDesc] = useState(description);
  let [newTitle, updateNewTitle] = useState(title);

  useEffect(() => {
    updateNewEnd(endTime);
    updateNewStart(startTime);
    updateNewTitle(title);
    updateNewDesc(description);
  }, [startTime, endTime, title, description])

  const save = () => {
    if (newStart.toString() !== '[object Object]' && newEnd.toString() !== '[object Object]' && newTitle !== '') {
      updateEnd(newEnd.getStringTime(true));
      updateStart(newStart.getStringTime());
      updateDescription(newDesc);
      updateTitle(newTitle);
      axios.patch('http://localhost:3001/meeting', {
        id: eventId,
        start_time: newStart.toString(),
        end_time: newEnd.toString(),
        description: newDesc,
        title: newTitle,
        seeker_accepted: false,
        canceled: false
      })
      .then(() => updateEvents())
      .then(() => updateVisible(false));
      if (company && !privateEvent) {
        axios.post('http://localhost:3001/notification', {
        user_id: seeker_id,
        type: 'Meeting Change',
        details: 'Your meeting for ' + title + ' has been edited'
      })
        .catch(err => console.log(err));
      }
    }
  }

  const cancel = () => {
    // Send cancellation message
    axios.patch('http://localhost:3001/meeting', {
        id: eventId,
        canceled: true
      })
    .then(() => updateEvents())
    .then(() => updateVisible(false));
  }

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: 'auto',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingRight: '20px',
    paddingLeft: '20px'
  }

  const buttonStyle = {
    color: '#E44F48'
  }

  const inputStyle={
    marginTop: '20px',

  }

  return (
    <Modal sx={{ top: '20%' }} open={visible}>
      <Box sx={boxStyle}>
      <h1 style={{color: '#E44F48', fontFamily: 'Montserrat'}}>Updating Event</h1>
          <TextField
            sx={inputStyle}
            label='Title'
            required
            defaultValue={newTitle}
            variant="filled"
            size="small"
            onChange={e => updateNewTitle(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-evenly'}}>
            <DateTimePicker
              label="Start Time"
              required
              value={newStart}
              onChange={e => {
                updateNewStart(e.$d)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="End Time"
              required
              value={newEnd}
              onChange={e => {
                updateNewEnd(e.$d)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            </div>
          </LocalizationProvider>
          <TextField
          sx={inputStyle}
            label="Description"
            multiline
            defaultValue={newDesc}
            variant="filled"
            size="small"
            onChange={e => updateNewDesc(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', marginBottom: '20px' }}>
          <Button sx={buttonStyle} onClick={cancel}>Cancel</Button>
          <Button sx={buttonStyle} onClick={save}>Save Changes</Button>
          <Button sx={buttonStyle} onClick={e => updateVisible(false)}>Close</Button>
          </div>
      </Box>
    </Modal>
  )
}

export default EditMeeting;