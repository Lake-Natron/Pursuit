import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EmployerJobListCard from '../src/EmployerJobListCard'
import NavBar from '../src/navBar'

const HomeEmployer = () => {
  const [jobListings, setJobListings] = useState([]);
  //need session info for company id
  const company_id = 10;

  useEffect(() => {
    axios.get(`http://localhost:3002/jobs?company_id=${company_id}`)
    .then((res) => {setJobListings(res.data)})
    .catch(err => {console.log(err)})
  }, [])

  return (
    <>
    <NavBar />
    <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid'}}>
      <nav aria-label="job-list-container">
        <List sx={{mt: 4}}>
          {jobListings.map((listing, index) =>
            <EmployerJobListCard listing={listing} key={index} />
          )}
        </List>
      </nav>
    </Box>
    </>
  )
}

export default HomeEmployer;