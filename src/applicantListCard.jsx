import React from 'react';
import { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const ApplicantListCard = () => {

  const handleInterestedClick = (e) => {
    e.preventDefault()
  }

  const handleNotInterestedClick = (e) => {
    e.preventDefault()
  }

  return (
    <>
    <ListItem sx={{border:'1px solid grey', width:'60vw', minHeight:'7em', marginBottom: '1em', borderRadius: '8px', overflow: 'hidden'}}>
        <ListItemText primary='Applicant Details' />
        <Button variant="contained" sx={{mr: '1em'}} onClick={handleInterestedClick}>Interested</Button>
        <Button variant="contained" onClick={handleNotInterestedClick}>Not Interested</Button>
    </ListItem>
    </>
  )
}

export default ApplicantListCard;