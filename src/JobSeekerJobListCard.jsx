import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Link from 'next/link';

const JobSeekerJobListCard = ({listing}) => {

  const handleClick = (e) => {
    e.preventDefault();
    console.log('Click')
  }

  return (
    <>
    <ListItem sx={{border:'1px solid grey', width:'60vw', minHeight:'7em', marginBottom: '1em', borderRadius: '8px', overflow: 'hidden'}}>
      <ListItemText primary='Job Listing Details' />
      <Button variant="contained" onClick={handleClick}>View Application</Button>
    </ListItem>
    </>
  )
}

export default JobSeekerJobListCard;