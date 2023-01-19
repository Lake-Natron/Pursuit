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

const EmployerJobListCard = ({listing}) => {
  //need to pass the job ID to viewApplicants so applicants can be pulled
  const closeDate = listing.close_date.slice(0, 10);
  console.log(closeDate)

  return (
    <>
    <ListItem sx={{border:'1px solid grey', width:'60vw', minHeight:'7em', marginBottom: '1em', borderRadius: '8px', overflow: 'hidden'}}>
      <ListItemText primary={listing.name} secondary={`Close Date: ${closeDate}`}/>
      <Button variant="contained">
        <Link style={{ textDecoration: 'none', color: 'white' }}
        href="/viewApplicants" as={`/viewApplicants?job_id=${listing.id}`}
        >
          View Applicants
        </Link>
      </Button>
    </ListItem>
    </>
  )
}

export default EmployerJobListCard;