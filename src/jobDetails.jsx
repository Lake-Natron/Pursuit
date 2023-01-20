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

let randomIndex = Math.floor(Math.random() * 5);
const coverImage = companyImages[randomIndex];
let defaultNote = 'This is your default note: Here are some things that you could add to track the progress of your application.';

const JobDetails = ({jobDetails, jobVisible, setVisible, notes}) => {
  const [editNotes, setEditNotes] = useState(defaultNote);
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

  // checks if the notes are null;
  useEffect(() => {
    if (notes !== null && notes !== '') {
      setEditNotes(notes);
    }

    return () => {};
  }, []);

  const handleClose = () => {
    setAnchor(null);
  }

  const handleOnSaveClick = (e) => {
    e.preventDefault();
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

  // let noteSection = '';

  // if (notes) {
  //   noteSection = (<>
  //                   {notes}
  //                 <br />
  //                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  //                   <Fab color="secondary" aria-label="edit note"
  //                     onClick={() => {setCanEditNote(true)}}
  //                     sx={{ m:2}}
  //                   >
  //                     <EditIcon />
  //                     </Fab>
  //                   </Box>
  //                 </>)
  // } else if (!notes) {
  //   noteSection = (<>
  //     <TextareaAutosize
  //         aria-label="empty textarea"
  //         placeholder={'enter your note here'}
  //         defaultValue={editNotes}
  //         value={editNotes}
  //         onChange={(e) => {seEdittNotes(e.target.value)}}
  //         style={{ width: '98%' }}
  //       />
  //     <Box display="flex" justifyContent="flex-end">
  //       <Fab color="secondary" aria-label="save note"
  //           onClick={handleOnSaveClick}
  //           sx={{ m:2}}
  //         >
  //           <DoneAllIcon size='small'/>
  //       </Fab>
  //     </Box>
  //    </>)
  // }

  return (
  <>
    {jobDetails && <Modal sx={{ top: '15%', overflow: 'scroll' }} open={jobVisible}>
      <Box sx={boxStyle}>
        <Box sx={{
          // backgroundColor: 'primary.dark',
          display: 'flex',
          justifyContent: 'flex-end',
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
        <Box sx={{
          display: 'flex',
          justifyContents: 'flex-center',
          marginTop: '1vh',
          marginBottom: '1vh',
          minHeight: '80px',
          fontSize: 16
        }}>
          <Typography variant="body2" sx={{
            fontSize: '1.1 rem'
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

          {!canEditNote  &&
          <>
            {editNotes}
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              value={editNotes}
              onChange={(e) => {setEditNotes(e.target.value)}}
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