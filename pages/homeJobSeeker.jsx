import React from 'react';
import { useState, useEffect } from 'react';
//import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import JobSeekerJobListCard from '../src/JobSeekerJobListCard'

const HomeJobSeeker = () => {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    // axios.get('/')
    // .then(())
    // .catch(())
  }, [])

  return (
    <>
    <div>
      <h1>Header - Job Seeker Home - Calendar, Search For Jobs, Post Resume/Cover Letter, etc. included here</h1>
    </div>
    <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid'}}>
      <nav aria-label="job-list-container">
        <List sx={{mt: 4}}>
          {jobListings.map((listing, index) =>
            <JobSeekerJobListCard listing={listing} key={index} />
          )}
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
        </List>
      </nav>
    </Box>
    </>
  )
}

export default HomeJobSeeker;