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
import Router from 'next/router'


const HomeJobSeeker = () => {
  const [jobListings, setJobListings] = useState([]);
  const [extreme, setExtreme] = useState([]);
  const [very, setVery] = useState([]);
  const [interested, setInterested] = useState([]);
  const { status, data } = useSession();

  useEffect(() => {
    axios.get('http://localhost:3001/jobs/applied')
    .then((res) => {setJobListings(res.data)})
    .then(() => {

    })
    .catch(err => {console.log(err)})
  }, [])

  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'seeker') Router.replace("/login");
  }, [status])

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
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
          <JobSeekerJobListCard />
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
      <button onClick={() => signOut()}>Sign Out</button>
    </Box>
    </>
  )
}

export default HomeJobSeeker;