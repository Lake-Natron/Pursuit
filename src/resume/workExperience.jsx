import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';

const { useState, useEffect } = React;

const WorkExperience = ({ index, works }) => {
  const [details, updateDetails] = useState(works[index].job_details);
  const [company, updateCompany] = useState(works[index].company);
  const [location, updateLocation] = useState(works[index].location);
  const [start, updateStart] = useState(works[index].start_date);
  const [end, updateEnd] = useState(works[index].end_date)

  useEffect(() => {
    works[index].job_details = details;
    works[index].location = location;
    works[index].company_name = company;
    works[index].start_date = start;
    works[index].end_date = end;
  }, [details, location, company, start, end, works, index])

  const inputStyle = {
    marginTop: '20px',
    width: '40%'
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
        <TextField
          sx={inputStyle}
          label='Company'
          required
          variant="filled"
          size="small"
          onChange={e => updateCompany(e.target.value)}
        />
        <TextField
          sx={inputStyle}
          label='Location'
          required
          variant="filled"
          size="small"
          onChange={e => updateLocation(e.target.value)}
        />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
        <TextField
          sx={{marginTop: '20px', width: '87%'}}
          label='Job Description'
          required
          multiline
          variant="filled"
          size="small"
          onChange={e => updateDetails(e.target.value)}
        />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Start Date"
            inputFormat="MM/DD/YYYY"
            value={start}
            onChange={e => { e && updateStart(e.$d) }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="End Date"
            inputFormat="MM/DD/YYYY"
            value={end}
            onChange={e => { e && updateEnd(e.$d) }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  )
}

export default WorkExperience;