import React from "react";
import { useState, useEffect } from 'react';
import NavBar from '../src/navBar';
import ApplicantListCard from '../src/applicantListCard';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ViewApplicants = () => {
  const [jobListings, setJobListings] = useState(['test', 'test', 'test', 'test', 'test', 'test', 'test']);

  useEffect(() => {
    // axios.get('/')
    // .then(())
    // .catch(())
  }, [])

  return (
    <>
    <NavBar />
    <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid'}}>
      <nav aria-label="applicant-list-container">
        <h2>Job Title? Other Info?</h2>
          {jobListings.map((listing, index) =>
            <ApplicantListCard listing={listing} key={index} />
          )}
      </nav>
    </Box>
    </>
  )
}

export default ViewApplicants;