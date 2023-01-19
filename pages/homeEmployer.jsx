import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EmployerJobListCard from '../src/EmployerJobListCard'
import NavBar from '../src/navBar'
import { useSession, signOut} from "next-auth/react";
import Router from 'next/router'

const HomeEmployer = () => {
  const [jobListings, setJobListings] = useState([]);
  const { status, data } = useSession();

  //need session info for company id
  const company_id = 10;


  // useEffect(() => {

  // }, [status])


  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'employer') Router.replace("/login");

    axios.get(`http://localhost:3001/jobs?company_id=${data?.user.id}`)
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
      <nav>{data?.user.id}</nav>
      <button onClick={() => signOut()}>Sign Out</button>
    </Box>
    </>
  )
}

export default HomeEmployer;