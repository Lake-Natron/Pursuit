import React from "react";
import { useState, useEffect } from 'react';
import NavBar from '../src/navBar';
import ApplicantListCard from '../src/applicantListCard';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

const ViewApplicants = () => {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    // axios.get('/')
    // .then(())
    // .catch(())
  }, [])

  return (
    <>
    <NavBar />
    <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid'}}>
      <nav aria-label="job-list-container">
        <h2>Have Job Details Here?</h2>
        <List sx={{mt: -1}}>
          {jobListings.map((listing, index) =>
            <ApplicantListCard listing={listing} key={index} />
          )}
          <ApplicantListCard />
          <ApplicantListCard />
          <ApplicantListCard />
        </List>
      </nav>
    </Box>
    </>
  )
}

export default ViewApplicants;