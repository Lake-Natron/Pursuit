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

const JobSeekerJobListCard = ({listing, seeDetailsVisibility}) => {
  const [companyName, setCompanyName] = useState('');
  const [jobDetails, setJobDetails] = useState('');
  const [closeDate,setCloseDate] = useState('');
  const job_id = listing.job_id;
  console.log("hiya",job_id)
  const handleClick = (e) => {
    e.preventDefault();
    seeDetailsVisibility(true, jobDetails);
    console.log('Click')
  }

  console.log('this is all the listing details', listing);
  console.log('listing notes', listing.seeker_notes)

  useEffect(() => {
    const getJobDetails = async () => {
      await axios.get(`http://localhost:3001/job?job_id=${job_id}`)
      .then(res => {
        console.log(res.data);
        setJobDetails(res.data);
        setCompanyName(res.data.User.company_name);
        setCloseDate(res.data.close_date.slice(0, 10))
      })
      .catch(err => {console.log(err)});
    }

    getJobDetails();
  }, [])

  return (
    <>
    <ListItem sx={{border:'1px solid grey', width:'60vw', minHeight:'7em', marginBottom: '1em', borderRadius: '8px', overflow: 'hidden'}}>
      <ListItemText primary={jobDetails.name} secondary={
        <Typography variant="body2" component="p" sx={{marginTop:'0.25em'}}>
            {companyName}
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