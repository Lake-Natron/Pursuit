import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateMeeting from '../src/calendar/createMeeting';
import EmployerAddNote from '../src/employerAddNote';
import { useSession, signOut} from "next-auth/react";
import Router from 'next/router';


const ApplicantListCard = ({ applicant }) => {
  const [visible, updateVisible] = useState(false);
  const [notesVisible, updateNotesVisible] = useState(false);
  const [applicantDetails, setApplicantsDetails] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const { status, data } = useSession();
  const [degree, setDegree] = useState('')

  const handleInterestedClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    axios.patch('http://localhost:3001/updateCompanyInterest', {
      'application_id': applicant.id,
      'company_interest_level': 'Interested'
    })
    .catch(err => {console.log(err)})
  }

  const handleNotInterestedClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    axios.patch('http://localhost:3001/updateCompanyInterest', {
      'application_id': applicant.id,
      'company_interest_level': 'Not Interested'
    })
    .catch(err => {console.log(err)})
  }

  const handleVisibleClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    updateVisible(!visible);
  }

  const handleNotesVisibleClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    updateNotesVisible(!notesVisible);
  }

  useEffect(() => {
    const getExperience = async () => {
      axios.get(`http://localhost:3001/workExperience?seeker_id=${applicant.seeker_id}`)
      .then(res => {setExperience(res.data)})
      .catch(err => {console.log(err)})
    }

    const getSkills = async () => {
      axios.get(`http://localhost:3001/skills?seeker_id=${applicant.seeker_id}`)
      .then(res => {setSkills(res.data)})
      .catch(err => {console.log(err)})
    }

    const getEducation = async () => {
      axios.get(`http://localhost:3001/education?seeker_id=${applicant.seeker_id}`)
      .then(res => {setEducation(res.data)})
      .catch(err => {console.log(err)})
    }

    if (data?.user.id) {
      getExperience();
      getSkills();
      getEducation();
    }
  }, [])

  console.log('here', applicant)
  console.log('exp', experience[0])
  console.log('skil', skills)
  //console.log('edu', education[0])
  console.log(applicant.company_interest_level)

  return (
    <>
      <Accordion sx={{width: '60vw', border:'1px solid grey', borderRadius: '8px', overflow: 'hidden'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box>
          <Typography sx={{}}>{applicant.User.first_name} {applicant.User.last_name}</Typography>
          <Box sx={{ml: '30vw', position:'relative', right:'1vw'}}>
            <Button variant="contained" sx={{mr: '1em'}} onClick={handleInterestedClick}>Interested</Button>
            <Button variant="contained" onClick={handleNotInterestedClick}>Not Interested</Button>
          </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{}}>
            Education: <br/>
          </Typography>
          <Typography>
            Skills: <br/>
          </Typography>
          <Typography>
            Experience: <br/>
          </Typography>
          <Typography>
            Notes: {applicant.company_notes}
          </Typography>
          <Box sx={{mt: 2, position:'relative', left:'29vw', width:'20vw'}}>
            <Button sx={{mr: '1em'}} variant="contained" onClick={handleVisibleClick}>Create Meeting</Button>
            <Button variant="contained" onClick={handleNotesVisibleClick}>Edit Notes</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <CreateMeeting visible={visible} updateVisible={updateVisible} application_id={applicant.id} seeker_id={applicant.seeker_id} />
      <EmployerAddNote notesVisible={notesVisible} updateNotesVisible={updateNotesVisible} application_id={applicant.id} seeker_id={applicant.seeker_id} />
    </>
  )
}

export default ApplicantListCard;


// degree
// :
// "test"
// graduate
// :
// true
// graduation_date
// :
// "2023-01-10T00:00:00.000Z"
// id
// :
// 5
// location
// :
// "teest"
// major
// :
// "test"
// school
// :
// "test"
// seeker_id
// :
// 20