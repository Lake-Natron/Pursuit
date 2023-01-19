import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import JobSeekerJobListCard from '../src/jobSeekerJobListCard';
import NavBar from '../src/navBar';
import JobDetails from '../src/jobDetails.jsx';
import { useSession, signOut } from "next-auth/react";
import Router from 'next/router'


const HomeJobSeeker = () => {
  const [jobListings, setJobListings] = useState([]);
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const [detailsOf, setDetailsOf] = useState(null);
  const [extreme, setExtreme] = useState([]);
  const [very, setVery] = useState([]);
  const [interested, setInterested] = useState([]);
  const { status, data } = useSession();

  //need seeker_id from session info
  //need to change port at some point
  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'seeker') Router.replace("/login");

    axios.get(`http://localhost:3002/jobs/applied?seeker_id=6`)
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
  }, [])

  // sets State to make popup modal visible
  const seeJobDeets = (visibility, detailsId = '') => {
    setDetailsVisibility(() => !detailsVisibility);
    setDetailsOf(detailsId);
  };

  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'seeker') Router.replace("/login");
  }, [status])

  return (
    <>
    <NavBar />
    <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '2em'}}>
      <nav aria-label="job-list-container">
        <h2>Extremely Interested</h2>
        <List sx={{mt: -1}}>
          {extreme.map((listing, index) =>
            <JobSeekerJobListCard listing={listing} key={index} />
          )}
          <JobSeekerJobListCard seeDetailsVisibility={setDetailsVisibility}/>
          <JobSeekerJobListCard seeDetailsVisibility={setDetailsVisibility}/>
          <JobSeekerJobListCard seeDetailsVisibility={setDetailsVisibility}/>
          <JobSeekerJobListCard seeDetailsVisibility={setDetailsVisibility}/>
        </List>
        <h2>Very Interested</h2>
        <List sx={{mt: -1}}>
          {very.map((listing, index) =>
            <JobSeekerJobListCard listing={listing} key={index} />
          )}
        </List>
        <h2>Interested</h2>
        <List sx={{mt: -1}}>
          {interested.map((listing, index) =>
            <JobSeekerJobListCard listing={listing} key={index} />
          )}
        </List>
      </nav>
      {detailsVisibility && <JobDetails id={detailsOf} jobVisible={detailsVisibility} setVisible={seeJobDeets}/>}
      <button onClick={() => signOut()}>Sign Out</button>
    </Box>
    </>

  )
}

export default HomeJobSeeker;