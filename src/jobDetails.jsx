import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CancelIcon from '@mui/icons-material/Cancel';
import Fab from '@mui/material/Fab';
import { useState, useEffect } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

let companyImages = [
  'http://socapglobal.com/wp-content/uploads/2019/05/all-inclusive-workspace-tech.jpg',
  'https://brightlineit.com/wp-content/uploads/2017/05/170522-Invest-New-Tech-for-Business.jpg',
  'https://www.coxblue.com/wp-content/uploads/agile-workplace.jpg',
  'https://workspacestrat.com/wp-content/uploads/2022/09/2022.09.14-workspace-strategies-coworking-office-spaces-management-company-preapring-success-future.jpg',
  'https://werqwise.com/wp-content/uploads/2021/04/perks-1024x576.jpg'
];

const JobDetails = ({jobDetails, jobVisible, setVisible}) => {
  const [notes, setNotes] = useState('Email arrives immediately, assuming you have the correct email address and your message does not get caught in a spam filter. So, unless the employer really seems to dislike technology (and you didn’t receive an email from anyone at this employer setting up the interview or see anyone using a computer while you were there), often the best strategy is start with email and follow-up with a formal paper thank you note If appropriate, send the email thank you as soon as you get home. Then, follow up with the formal thank you as soon as possible after that.');
  // const [company, setJobCompany] = useState('Nike');
  const [canEditNote, setCanEditNote] = useState(false);
  const [jobDeets, setJobDeets] = useState({
    name: 'Software Engineer',
    company_id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    salary: 100000,
    location: '37421',
    close_date: new Date('2023-01-31'),
    experience_type: 'Mid Level',
    employment_type: 'Full-Time',
    jobsite: 'Onsite'
  });

  useEffect(() => {
    // TODO: GET NOTES FOR JOBS
    // SAVE JOB TO notes STATE
  }, []);

  const handleClose = () => {
    setAnchor(null);
  }

  const handleOnSaveClick = () => {
    setCanEditNote(!canEditNote);
    // TODO: SAVE NOTE FOR JOBS
  }

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: 'auto',
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingRight: '20px',
    paddingLeft: '20px',
    paddingTop: '30px',
    paddingBottom: '30px'
  }

  let randomIndex = Math.floor(Math.random() * 5);
  const coverImage = companyImages[randomIndex];

  return (
  <>
    {jobDetails && <Modal sx={{ top: '20%' }} open={jobVisible}>
      <Box sx={boxStyle}>
        <Box display="flex" justifyContent="flex-end" sx={{
          // backgroundColor: 'primary.dark',
          backgroundImage: `url(${coverImage})`,
          backgroundRepeat: 'cover',
          backgroundPosition: 'center',
          minHeight: '180px'
        }}>
          <Fab color="secondary" aria-label="save note"
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(false);
                }}
                sx={{ m:2}}
              >
            <CancelIcon size='small'/>
          </Fab>
        </Box>
        <Card sx={{ mb: 1.5, boxShadow: 0 }}>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {jobDetails.User.company_name}
        </Typography>
        <Typography variant="h3" component="div">
          {jobDetails.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {jobDetails.jobsite} {bull} {jobDetails['employment_type']} {bull} {jobDetails['experience_type']}
        </Typography>
        <Box diplay="flex" justifyContents="flex-center" sx={{
          marginTop: '1vh',
          marginBottom: '1vh',
          minHeight: '80px',
          fontSize: 18
        }}>
          <Typography variant="body2" sx={{
            fontSize: '1.2rem'
          }}>
            {jobDetails.description}
          </Typography>
        </Box>
        </Card>
        <Card sx={{ mb: 1.5, boxShadow: 0, width: '95%' }}>
          <Typography variant="h4"> Your Notes </Typography>
          <br />
          {'Below are your notes: '}
          <br />
          {!canEditNote &&
          <>
            {notes}
            <br />
            <Box display="flex" justifyContent="flex-end">
              <Fab color="secondary" aria-label="edit note"
                onClick={() => {setCanEditNote(true)}}
                sx={{ m:2}}
              >
                <EditIcon />
              </Fab>
            </Box>
          </>}
         {canEditNote &&
         <>
          <TextareaAutosize
              aria-label="empty textarea"
              placeholder={'enter your note here'}
              defaultValue={notes}
              value={notes}
              onChange={(e) => {setNotes(e.target.value)}}
              style={{ width: '98%' }}
            />
          <Box display="flex" justifyContent="flex-end">
            <Fab color="secondary" aria-label="save note"
                onClick={handleOnSaveClick}
                sx={{ m:2}}
              >
                <DoneAllIcon size='small'/>
            </Fab>
          </Box>
         </>
          }
        </Card>
      </Box>
    </Modal>
  }
  </>
  )
}

export default JobDetails;