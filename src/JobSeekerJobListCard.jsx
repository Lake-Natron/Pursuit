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
import { Typography } from '@mui/material';

const JobSeekerJobListCard = ({listing}) => {
  const [companyName, setCompanyName] = useState('')
  const closeDate = listing.Job.close_date.slice(0, 10);
  const job_id = listing.job_id;


  const handleClick = (e) => {
    e.preventDefault();
    console.log('Click')
  }
  console.log(listing)

  //make sure to change port at some point
  //need a route to get company name
  useEffect(() => {
    console.log(job_id)
    axios.get(`http://localhost:3002/job?job_id=${job_id}`)
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})
  })

  return (
    <>
    <ListItem sx={{border:'1px solid grey', width:'60vw', minHeight:'7em', marginBottom: '1em', borderRadius: '8px', overflow: 'hidden'}}>
      <ListItemText primary={listing.Job.name} secondary={
        <Typography variant="body2" component="p" sx={{marginTop:'0.25em'}}>
            Company Name
            <br/>
            Close Date: {closeDate}
        </Typography>
      }/>
      <Button variant="contained" onClick={handleClick}>View Application</Button>
    </ListItem>
    </>
  )
}

export default JobSeekerJobListCard;