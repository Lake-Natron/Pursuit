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
  const closeDate = listing.close_date.slice(0, 10);

  return (
    <>
    <ListItem sx={{border:'1px solid grey', width:'60vw', minHeight:'7em', marginBottom: '1em', borderRadius: '8px', overflow: 'hidden'}}>
      <ListItemText primary={listing.name} secondary={`Close Date: ${closeDate}`}/>

        <Link style={{ textDecoration: 'none', color: 'white' }}
        href={{pathname: "/viewApplicants", query: {job_id: listing.id}}}
        >
          <Button variant="contained">View Applicants</Button>
        </Link>
    </ListItem>
    </>
  )
}

export default EmployerJobListCard;