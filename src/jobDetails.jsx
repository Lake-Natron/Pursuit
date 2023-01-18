import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const { useState, useEffect } = React;

const Notifications = ({ notifications, visible, updateVisible, setNotifications }) => {

  const handleClose = () => {
    setAnchor(null);
  }

  const removeNotification = (index) => {
    let list = [...notifications];
    list.splice(index, 1);
    setNotifications(list);
    if (list.length === 0) {
      updateVisible(false);
    }
    // Send request
  }

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: 'auto',
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingRight: '20px',
    paddingLeft: '20px'
  }

  return (
    <Modal sx={{ top: '20%' }} open={visible}>
      <Box sx={boxStyle}>

      </Box>
    </Modal>
  )
}

export default Notifications;