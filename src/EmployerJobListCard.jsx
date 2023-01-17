import React from 'react';
import { useState, useEffect } from 'react';
//import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const EmployerJobListCard = () => {
  return (
    <>
    <ListItem sx={{border:'1px solid grey', width:'60vw', minHeight:'7em', marginBottom: '1em', borderRadius: '8px', overflow: 'hidden'}}>
        <ListItemText primary='Job Listing Details' />
        <ListItemButton sx={{border:'1px solid grey', borderRadius: '8px', overflow: 'hidden'}}> Button </ListItemButton>
    </ListItem>
    </>
  )
}

export default EmployerJobListCard;