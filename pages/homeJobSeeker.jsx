import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import JobSeekerJobListCard from '../src/JobSeekerJobListCard';
import NavBar from '../src/navBar';
import { useSession, signOut } from "next-auth/react";
import Router from 'next/router';


const HomeJobSeeker = () => {
  const [extreme, setExtreme] = useState([]);
  const [very, setVery] = useState([]);
  const [interested, setInterested] = useState([]);
  const { status, data } = useSession();

  //need seeker_id from session info
  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'seeker') Router.replace("/login");

    axios.get(`http://localhost:3001/jobs/applied?seeker_id=6`)
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
      <button onClick={() => signOut()}>Sign Out</button>
    </Box>
    </>
  )
}

export default HomeJobSeeker;