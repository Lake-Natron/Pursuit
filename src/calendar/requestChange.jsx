import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const { useState, useEffect } = React;

const Request = ({visible, updateVisible}) => {
  let [description, updateDescription] = useState('');

  useEffect(() => {
    updateDescription('');
  }, [visible])

  const sendRequest = () => {
    if (description) {
      // Send Request
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
        <h1 style={{color: '#E44F48', fontFamily: 'Montserrat'}}>Requesting Alternative Time</h1>
          <TextField
            sx={inputStyle}
            required
            label='Details'
            variant="filled"
            size="small"
            onChange={e => updateDescription(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', marginBottom: '20px' }}>
          <Button sx={buttonStyle} onClick={sendRequest}>Send</Button>
          <Button sx={buttonStyle} onClick={e => updateVisible(false)}>Close</Button>
          </div>
      </Box>
    </Modal>
  )
}

export default Request;