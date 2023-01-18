import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import JobSeekerJobListCard from '../src/JobSeekerJobListCard';
import NavBar from '../src/navBar';
import JobDetails from '../src/jobDetails.jsx';

const HomeJobSeeker = () => {
  const [jobListings, setJobListings] = useState([]);
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const [detailsOf, setDetailsOf] = useState(null);

  useEffect(() => {
    // axios.get('/')
    // .then(())
    // .catch(())
  }, [])

  // sets State to make popup modal visible
  const seeJobDeets = (visibility, detailsId = '') => {
    setDetailsVisibility(() => !detailsVisibility);
    setDetailsOf(detailsId);
  };

  return (
    <>
    <NavBar />
    <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid'}}>
      <nav aria-label="job-list-container">
        <h2>Extremely Interested</h2>
        <List sx={{mt: -1}}>
          {jobListings.map((listing, index) =>
            <JobSeekerJobListCard listing={listing} key={index} />
          )}
          <JobSeekerJobListCard seeDetailsVisibility={setDetailsVisibility}/>
          <JobSeekerJobListCard seeDetailsVisibility={setDetailsVisibility}/>
          <JobSeekerJobListCard seeDetailsVisibility={setDetailsVisibility}/>
          <JobSeekerJobListCard seeDetailsVisibility={setDetailsVisibility}/>
        </List>
        <h2>Very Interested</h2>
        <List sx={{mt: -1}}>
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
        </List>
        <h2>Interested</h2>
        <List sx={{mt: -1}}>
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
        </List>
      </nav>
      {detailsVisibility && <JobDetails id={detailsOf} jobVisible={detailsVisibility} setVisible={seeJobDeets}/>}
    </Box>
    </>

  )
}

export default HomeJobSeeker;