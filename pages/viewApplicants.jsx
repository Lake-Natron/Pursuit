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
import { useSession, signOut} from "next-auth/react";
import Router from 'next/router';

const ViewApplicants = ({query}) => {
  const [applicantList, setApplicantList] = useState([]);
  const [jobName, setJobName] = useState('')
  const router = useRouter();
  const { job_id } = router.query;
  const [jobId, setJobId] = useState(job_id)
  const { status, data } = useSession();
  console.log('q', query)

  useEffect(() => {
    const getApplicants = async () => {
      axios.get(`http://localhost:3001/jobs/applicants?job_id=${{query}.query}`)
      .then((res) => {
        setApplicantList(res.data);
        setJobName(res.data[0].Job.name);
      })
      .catch(err => {console.log(err)})
    }

    if (data?.user.id) {
      getApplicants();
    }
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

ViewApplicants.getInitialProps = async ({ query }) => {
  console.log('asdfasdf', {query}.query.job_id)
  await axios.get(`http://localhost:3001/jobs/applicants?job_id=${{query}.query.job_id}`)
  .then((res) => {
    console.log('okok', res)
    setApplicantList(res.data);
    setJobName(res.data[0].Job.name);
  })
  .catch(err => {console.log(err)})
  return ({query}.query.job_id)
}

export default ViewApplicants;