import React from 'react';
import { useState, useEffect } from 'react';
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
    //Patch request to update interest level
  }

  const handleNotInterestedClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    //Patch request to update interest level
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
  console.log(applicant)

  //need useeffect and get request to pull applicant details
  return (
    <>
      <Accordion sx={{width: '60vw', border:'1px solid grey'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{applicant.User.first_name} {applicant.User.last_name}</Typography>
          <Box sx={{ml: '50%', border: '1px solid'}}>
            <Button variant="contained" sx={{mr: '1em'}} onClick={handleInterestedClick}>Interested</Button>
            <Button variant="contained" onClick={handleNotInterestedClick}>Not Interested</Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{}}>
            Education: <br/>
            Skills: <br/>
            Other Info: <br/>
            Notes:
          </Typography>
          <Box sx={{mt: 2, ml: '60%', border: '1px solid'}}>
            <Button sx={{mr: '1em'}} variant="contained" onClick={handleVisibleClick}>Create Meeting</Button>
            <Button variant="contained" onClick={handleNotesVisibleClick}>Edit Notes</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <CreateMeeting visible={visible} updateVisible={updateVisible} application_id={1} seeker_id={1} />
      <EmployerAddNote notesVisible={notesVisible} updateNotesVisible={updateNotesVisible} application_id={1} seeker_id={1} />
    </>
  )
}

export default ApplicantListCard;