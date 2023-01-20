import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const { useState, useEffect } = React;

const EmployerAddNote = ({ notesVisible, updateNotesVisible, application_id, seeker_id}) => {
  let [description, updateDescription] = useState(description);
  let [title, updateTitle] = useState(title);

  const save = () => {
    //add route to save note
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
    <Modal sx={{ top: '20%' }} open={notesVisible}>
      <Box sx={boxStyle}>
      <h1 style={{color: '#E44F48', fontFamily: 'Montserrat'}}>Applicant Notes</h1>
          <TextField
          sx={inputStyle}
            label="Notes"
            multiline
            row={4}
            defaultValue={description}
            variant="filled"
            onChange={e => updateDescription(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', marginBottom: '20px' }}>
          <Button sx={buttonStyle} onClick={save}>Save Changes</Button>
          <Button sx={buttonStyle} onClick={e => updateNotesVisible(false)}>Close</Button>
          </div>
      </Box>
    </Modal>
  )
}

export default EmployerAddNote;