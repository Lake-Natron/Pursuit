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

const CreateMeeting = ({ visible, updateVisible, application_id, seeker_id}) => {
  let [start, updateStart] = useState({});
  let [end, updateEnd] = useState({});
  let [description, updateDescription] = useState(description);
  let [title, updateTitle] = useState(title);

  const save = () => {
    if (start.toString() !== '[object Object]' && end.toString() !== '[object Object]' && title !== '') {
      // Send request before updating visibility
      let params = {
        start_time: start.toString(),
        end_time: end.toString(),
        description: description,
        title: title,
        application_id: application_id,
        seeker_id: seeker_id,
        company_id: 9
      }
      axios.post('http://localhost:3001/meeting', params)
        .catch(err => console.log(err))
      axios.post('http://localhost:3001/notification', {
        user_id: seeker_id,
        type: 'Meeting Request',
        details: 'You have a meeting request for ' + title
      })
        .catch(err => console.log(err));
      updateVisible(false);
    }
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
      <h1 style={{color: '#E44F48', fontFamily: 'Montserrat'}}>Scheduling Meeting</h1>
          <TextField
            sx={inputStyle}
            label='Title'
            required
            defaultValue={title}
            variant="filled"
            size="small"
            onChange={e => updateTitle(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-evenly'}}>
            <DateTimePicker
              label="Start Time"
              required
              value={start}
              onChange={e => {
                updateStart(e.$d)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="End Time"
              required
              value={end}
              onChange={e => {
                updateEnd(e.$d)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            </div>
          </LocalizationProvider>
          <TextField
          sx={inputStyle}
            label="Description"
            multiline
            defaultValue={description}
            variant="filled"
            size="small"
            onChange={e => updateDescription(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', marginBottom: '20px' }}>
          <Button sx={buttonStyle} onClick={save}>Save Changes</Button>
          <Button sx={buttonStyle} onClick={e => updateVisible(false)}>Close</Button>
          </div>
      </Box>
    </Modal>
  )
}

export default CreateMeeting;