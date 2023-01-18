import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateMeeting from '../src/calendar/createMeeting'


const ApplicantListCard = () => {
  const[visible, updateVisible] = useState(false)

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

  return (
    <>
      <Accordion sx={{width: '60vw', border:'1px solid grey'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Applicant Name</Typography>
          <Box sx={{ml: '50%'}}>
            <Button variant="contained" sx={{mr: '1em'}} onClick={handleInterestedClick}>Interested</Button>
            <Button variant="contained" onClick={handleNotInterestedClick}>Not Interested</Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{}}>
            Education: <br/>
            Skills: <br/>
            Other Info: <br/>
          </Typography>
          <Box sx={{ml: '60%'}}>
            <Button sx={{mt:2}} variant="contained" onClick={handleVisibleClick}>Create Meeting</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <CreateMeeting visible={visible} updateVisible={updateVisible} application_id={1} seeker_id={1} />
    </>
  )
}

export default ApplicantListCard;