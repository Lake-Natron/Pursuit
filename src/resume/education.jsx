import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';

const { useState, useEffect } = React;

const Education = ({index, eds}) => {
  const [school, updateSchool] = useState(eds[index].school);
  const [location, updateLocation] = useState(eds[index].location);
  const [degree, updateDegree] = useState(eds[index].degree);
  const [major, updateMajor] = useState(eds[index].major);
  const [graduated, updateGraduated] = useState(eds[index].graduated || true);
  const [gradDate, updateGradDate] = useState(eds[index].gradDate);

  useEffect(() => {
    eds[index].school = school;
    eds[index].location = location;
    eds[index].degree = degree;
    eds[index].major = major;
    eds[index].graduated = graduated;
    eds[index].gradDate = gradDate;
  }, [school, location, degree, major, graduated, gradDate, eds, index])

  const inputStyle={
    marginTop: '20px',
    width: '40%'
  }

  return (
    <div style={{width: '100%'}}>
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
      <TextField
            sx={inputStyle}
            label='School'
            required
            variant="filled"
            size="small"
            onChange={e => updateSchool(e.target.value)}
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
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
      <TextField
            sx={inputStyle}
            label='Degree'
            required
            variant="filled"
            size="small"
            onChange={e => updateDegree(e.target.value)}
          />
      <TextField
            sx={inputStyle}
            label='Major'
            required
            variant="filled"
            size="small"
            onChange={e => updateMajor(e.target.value)}
          />
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: '10px'}}>
      <div >
        Graduated <Checkbox onClick={e => updateGraduated(e.target.checked)} defaultChecked />
      </div>
      {graduated && <div style={{marginTop: '10px'}}><LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
          label="Graduation Date"
          inputFormat="MM/DD/YYYY"
          value={gradDate}
          onChange={e => {e && updateGradDate(e.$d)}}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider></div>}
      </div>
    </div>
  )
}

export default Education;