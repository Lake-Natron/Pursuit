import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EmployerJobListCard from '../src/EmployerJobListCard';
import NavBar from '../src/navBar';
import { useSession, signOut} from "next-auth/react";
import Router from 'next/router';

const HomeEmployer = () => {
  const [jobListings, setJobListings] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'employer') Router.replace("/login");

<<<<<<< HEAD
    axios.get(`http://localhost:3001/jobs?company_id=${data?.user.id}`)
    .then((res) => {setJobListings(res.data)})
    .catch(err => {console.log(err)})
=======
    const getCompanyName = async () => {
      await axios.get(`http://localhost:3001/user?id=${data?.user.id}`)
      .then(res => {console.log('2', res.data); setCompanyName(res.data.company_name)})
      .catch(err => {console.log(err)})
    }

    const getCompanyJobListings = async () => {
      await axios.get(`http://localhost:3001/jobs?company_id=${data?.user.id}`)
      .then(res => {setJobListings(res.data)})
      .catch(err => {console.log(err)})
    }

    if (data?.user.id) {
      getCompanyName();
      getCompanyJobListings();
    }
>>>>>>> dev
  }, [])

  return (
    <>
    <NavBar />
    <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', mt:'2em'}}>
      <nav aria-label="job-list-container">
        <h2>{companyName}</h2>
        <List sx={{mt: '1em'}}>
          {jobListings.map((listing, index) =>
            <EmployerJobListCard listing={listing} key={index} />
          )}
        </List>
      </nav>
<<<<<<< HEAD
      <nav>{data?.user.id}</nav>
      <button onClick={() => signOut()}>Sign Out</button>
=======
>>>>>>> dev
    </Box>
    </>
  )
}

export default HomeEmployer;