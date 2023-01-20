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


const ApplicantListCard = ({ applicant }) => {
  const [visible, updateVisible] = useState(false);
  const [notesVisible, updateNotesVisible] = useState(false);
  const [applicantDetails, setApplicantsDetails] = useState([]);

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
  console.log('here', applicant)

  // useEffect(() => {
  //   axios.get('http://localhost:3002/updateCompanyInterest')
  //   .then(res => setApplicantsDetails(res.data))
  //   .catch(err => {console.log(err)})
  // }, [])

  return (
    <>
      <Accordion sx={{width: '60vw', border:'1px solid grey', borderRadius: '8px', overflow: 'hidden'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{applicant.User.first_name} {applicant.User.last_name}</Typography>
          <Box sx={{ml: '30vw', width:'20vw', position:'relative', left:'7px'}}>
            <Button variant="contained" sx={{mr: '1em'}} onClick={handleInterestedClick}>Interested</Button>
            <Button variant="contained" onClick={handleNotInterestedClick}>Not Interested</Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{}}>
            Education: <br/>
            Skills: <br/>
            Other Info: <br/>
            Notes: {applicant.company_notes}
          </Typography>
          <Box sx={{mt: 2, position:'relative', left:'600px', width:'20vw'}}>
            <Button sx={{mr: '1em'}} variant="contained" onClick={handleVisibleClick}>Create Meeting</Button>
            <Button variant="contained" onClick={handleNotesVisibleClick}>Edit Notes</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <CreateMeeting visible={visible} updateVisible={updateVisible} application_id={applicant.id} seeker_id={applicant.seeker_id} />
      <EmployerAddNote notesVisible={notesVisible} updateNotesVisible={updateNotesVisible} application_id={1} seeker_id={1} />
    </>
  )
}

export default ApplicantListCard;