import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';

const { useState, useEffect } = React;

const Notifications = ({ notifications, visible, updateVisible, setNotifications }) => {

  const handleClose = () => {
    setAnchor(null);
  }

  const removeNotification = (index) => {
    let id = notifications[index].id;
    let list = [...notifications];
    list.splice(index, 1);
    setNotifications(list);
    if (list.length === 0) {
      updateVisible(false);
    }
    axios.patch('http://localhost:3001/notification', {id})
      .catch(err => console.log(err));
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
    paddingLeft: '20px',
    paddingBottom: '20px'
  }

  return (
    <Modal sx={{ top: '20%' }} open={visible}>
      <Box sx={boxStyle}>
        {notifications.map((notification, i) => {
          return (<div key={i} style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <h3>{notification.type}</h3>
              <p>{notification.details}</p>
            </div>
            <Button sx={{height: '5vh', marginTop: 'auto', marginBottom: 'auto'}} variant="contained" onClick={e => removeNotification(i)}>Remove</Button>
          </div>)
        })}
        <Button variant="contained"  onClick={e => updateVisible(false)}>Close</Button>
      </Box>
    </Modal>

  )
}

export default Notifications;