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
import { useSession, signOut } from "next-auth/react";
import Router from 'next/router';
import { Typography } from '@mui/material';
import Link from 'next/link';
import Button from '@mui/material/Button';

const HomeJobSeeker = () => {
  const [jobListings, setJobListings] = useState([]);
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const [detailsOf, setDetailsOf] = useState(null);
  const [extreme, setExtreme] = useState([]);
  const [very, setVery] = useState([]);
  const [interested, setInterested] = useState([]);
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'seeker') Router.replace("/login");
    const getJobListings = async () => {
      await axios.get(`http://localhost:3001/jobs/applied?seeker_id=${data?.user.id}`)
      .then(res => {
        const extreme = res.data.filter(item =>
          item.seeker_interest_level === 'Extremely Interested'
        );
        setExtreme(extreme);
        const very = res.data.filter(item =>
          item.seeker_interest_level === 'Very Interested'
        );
        setVery(very);
        const interested = res.data.filter(item =>
          item.seeker_interest_level === 'Interested'
        );
        setInterested(interested);
      })
      .catch(err => {console.log(err)})
    }

    if (data?.user.id) {
      getJobListings();
    }
  }, [])

  // sets State to make popup modal visible
  const seeJobDeets = (visibility, detailsId = '') => {
    setDetailsVisibility(() => !detailsVisibility);
    setDetailsOf(detailsId);
  };

  if (extreme.length === 0 && very.length === 0 && interested.length === 0) {
    return (
      <>
      <NavBar />
      <Typography align="center" mt="50px">You have not applied to any jobs yet. Go to the Job Board to find jobs!</Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: '2em' }}>
        <Button variant="contained">
          <Link style={{ textDecoration: 'none', color: 'inherit' }} contained href="/jobSearch">Job Board</Link>
        </Button>
      </Box>

      </>
    )
  } else {
    return (
      <>
      <NavBar />
      <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '2em'}}>
        <nav aria-label="job-list-container">
          {extreme.length >= 1 && <h2>Extremely Interested</h2>}
          <List sx={{mt: -1}}>
            {extreme.map((listing, index) =>
              <JobSeekerJobListCard listing={listing} key={index} seeDetailsVisibility={setDetailsVisibility}/>
            )}
          </List>
          {very.length >= 1 && <h2>Very Interested</h2>}
          <List sx={{mt: -1}}>
            {very.map((listing, index) =>
              <JobSeekerJobListCard listing={listing} key={index} seeDetailsVisibility={setDetailsVisibility}/>
            )}
          </List>
          {interested.length >= 1 && <h2>Interested</h2>}
          <List sx={{mt: -1}}>
            {interested.map((listing, index) =>
              <JobSeekerJobListCard listing={listing} key={index} seeDetailsVisibility={setDetailsVisibility}/>
            )}
          </List>
        </nav>
        {detailsVisibility && <JobDetails id={detailsOf} jobVisible={detailsVisibility} setVisible={seeJobDeets}/>}
      </Box>
      </>

    )
  }
}

export default HomeJobSeeker;