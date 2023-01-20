import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../src/navBar';
import ApplicantListCard from '../src/applicantListCard';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

const ViewApplicants = () => {
  const [applicantList, setApplicantList] = useState([]);
  const [jobName, setJobName] = useState('')
  const router = useRouter();
  const { job_id } = router.query;
  const [jobId, setJobId] = useState(job_id)
  console.log('here', jobId)

  useEffect(() => {
    console.log('test', job_id)
  }, [job_id])

  //need job_id through session storage
  useEffect(() => {
    console.log('in here', jobId)
    axios.get(`http://localhost:3001/jobs/applicants?job_id=${jobId}`)
    .then((res) => {
      setApplicantList(res.data);
      setJobName(res.data[0].Job.name);
    })
    .catch(err => {console.log(err)})
  }, [])

  return (
    <>
    <NavBar />
    <Box sx={{mt: '2em', width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <nav aria-label="applicant-list-container">
        <h2>{jobName}</h2>
          {applicantList.map((applicant, index) =>
            <ApplicantListCard applicant={applicant} key={index} />
          )}
      </nav>
    </Box>
    </>
  )
}

export default ViewApplicants;