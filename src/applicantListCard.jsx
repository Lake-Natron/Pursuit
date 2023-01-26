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
  const [degree, setDegree] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [seekerId, setSeekerId] = useState(applicant.seeker_id);

  const handleInterestedClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    axios.patch('http://localhost:3001/updateCompanyInterest', {
      'application_id': applicant.id,
      'company_interest_level': 'Interested'
    })
    .catch(err => {console.log(err)})
  }

  const handleNotInterestedClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    axios.patch('http://localhost:3001/updateCompanyInterest', {
      'application_id': applicant.id,
      'company_interest_level': 'Not Interested'
    })
    .then(() => {setLoaded()})
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
    if (loaded) {
      return;
    }

    const getExperience = async () => {
      return axios.get(`http://localhost:3001/workExperience?seeker_id=${applicant.seeker_id}`)
    }

    const getSkills = async () => {
      return axios.get(`http://localhost:3001/skills?seeker_id=${applicant.seeker_id}`)
    }

    const getEducation = async () => {
      return axios.get(`http://localhost:3001/education?seeker_id=${applicant.seeker_id}`)
    }

    if (data?.user.id) {
      Promise.all([getExperience(), getSkills(), getEducation()])
        .then(([experience, skills, education]) => {
          setExperience(experience.data[0]);
          setSkills(skills.data);
          setEducation(education.data[0]);
          setLoaded(true)
        })
        .catch(err => {console.log(err)});
    }
  }, [])

  const skillsList = skills.map(skill => {
    return {
      skill: skill.skill,
    }
  });

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
            Education: {education && education.degree} {education && education.major + ' from'} {education && education.school}
            <Typography sx={{fontSize: '0.8rem'}}>
            Graduated: {education && education.graduation_date}
            </Typography>
          </Typography> <br/>
          <Typography>
            Skills: {skillsList[0] && skillsList[0].skill} {skillsList[1] &&'| ' + skillsList[1].skill} {skillsList[2] &&'| ' + skillsList[2].skill} {skillsList[3] &&'| ' + skillsList[3].skill} {skillsList[4] &&'| ' + skillsList[4].skill} {skillsList[5] &&'| ' + skillsList[5].skill}
          </Typography> <br/>
          <Typography>
            Experience: {experience && experience.company_name}
            <Typography sx={{fontSize: '0.8rem'}}>
              Job Details: {experience && experience.job_details}
            </Typography>
            <Typography sx={{fontSize: '0.8rem'}}>
              Start Date: {experience && experience.start_date + '; '} <br/> End Date: {experience && experience.end_date}
            </Typography> <br/>
          </Typography>
          <Typography>
            Notes: {applicant.company_notes}
          </Typography> <br/>
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