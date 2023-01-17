import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ApplicantListCard = () => {

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

  return (
    <>
      <Accordion sx={{m: 3, width: '60vw', border:'1px solid grey'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Applicant Name</Typography>
          <Box sx={{ml: '30vw'}}>
            <Button variant="contained" sx={{mr: '1em'}} onClick={handleInterestedClick}>Interested</Button>
            <Button variant="contained" onClick={handleNotInterestedClick}>Not Interested</Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{}}>
            Education: <br/>
            Skills: <br/>

          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default ApplicantListCard;