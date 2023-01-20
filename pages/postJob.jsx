import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NavBar from '../src/navBar';
import { useSession, signOut} from "next-auth/react";
import Router from 'next/router';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const site = [
  'Remote',
  'Onsite',
  'Hybrid'
];

const experience = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Executive Level'
];

const employment = [
  'Full-Time',
  'Part-Time',
  'Temporary',
  'Internship',
  'Contract'
];

const PostJob = () => {
  const theme = useTheme();
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [jobSite, setJobSite] = useState('');
  const [experienceType, setExperienceType] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [isFormValid, setIsFormValid] = useState(false)
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'employer') Router.replace("/login");
  }, [])

  const handleLocationChange = (e) => {
    const local = e.target.value;
    setLocation(local);

    if (!local.match(/^\d{5}$/)) {
      setError('Please enter a valid 5 digit zipcode"');
    } else {
      setError('');
    }
  }

  const handleSiteChange = (e) => {
    const {
      target: { value },
    } = e;
    setJobSite(
      value,
    );
  };

  const handleExpChange = (e) => {
    const {
      target: { value },
    } = e;
    setExperienceType(
      value,
    );
  };

  const handleEmpChange = (e) => {
    const {
      target: { value },
    } = e;
    setEmploymentType(
      value,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.elements.title.value;
    let closeDate = e.target.elements.closeDate.value;
    let jobDescription = e.target.elements.jobDescription.value;
    let skills = e.target.elements.skills.value;
    let salary = e.target.elements.salary.value;
    let company_id = company_id

    if (!title || !closeDate || !jobDescription || !skills || !salary || !location || !jobSite || !experienceType || !employmentType) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      axios.post('http://localhost:3001/job', {
        title: title,
        close_date: closeDate,
        jobDescription: jobDescription,
        skills: skills,
        salary: Number(salary),
        location: location,
        jobSite: jobSite,
        experienceType: experienceType,
        employmentType: employmentType,
        company_id: data?.user.id
      })
      .catch(err => {console.log(err)})
    }
  }

  return (
    <>
    <NavBar />
    <Container sx={{mt:3}}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, minwidth: '35vw' }
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <FormControl>
            <TextField
              required
              sx={{minWidth:'35vw'}}
              id="title"
              label="Title"
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField
              required
              sx={{minWidth:'35vw'}}
              id="closeDate"
              label="Close Date"
              InputLabelProps={{
                shrink: true,
              }}
              type='date'
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField
              required
              sx={{minWidth:'35vw'}}
              multiline
              id="jobDescription"
              label="Job Description"
              rows={6}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField
              required
              sx={{minWidth:'35vw'}}
              id="skills"
              label="Skills"
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{m:1, minWidth:'35vw'}}>
            <InputLabel htmlFor="salaryLabel" required>Salary</InputLabel>
            <OutlinedInput
              id="salary"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              type='number'
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField
              required
              sx={{minWidth:'35vw'}}
              id="location"
              label="Location (City, State, Zip)"
              value={location}
              onChange={handleLocationChange}
              error={error !== ''}
              helperText={error}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{m:1, minWidth:'35vw'}}>
            <InputLabel id="job-site-label" required>Job Site</InputLabel>
              <Select
                labelId="job-site-label"
                id="job-site"
                value={jobSite}
                onChange={handleSiteChange}
                input={<OutlinedInput label="Job Site" />}
                MenuProps={MenuProps}
              >
                {site.map((exp) => (
                  <MenuItem
                    key={exp}
                    value={exp}
                  >
                    {exp}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{m:1, minWidth:'35vw'}}>
            <InputLabel id="experience-label" required>Experience</InputLabel>
              <Select
                labelId="experience-label"
                id="experience"
                value={experienceType}
                onChange={handleExpChange}
                input={<OutlinedInput label="Experience" />}
                MenuProps={MenuProps}
              >
                {experience.map((exp) => (
                  <MenuItem
                    key={exp}
                    value={exp}
                  >
                    {exp}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{m:1, minWidth:'35vw'}}>
            <InputLabel id="employment-label" required>Employment Type</InputLabel>
              <Select
                labelId="employment-label"
                id="employment"
                value={employmentType}
                onChange={handleEmpChange}
                input={<OutlinedInput label="Employment Type" />}
                MenuProps={MenuProps}
              >
                {employment.map((emp) => (
                  <MenuItem
                    key={emp}
                    value={emp}
                  >
                    {emp}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div>
        <div>
          <Button type='submit' variant="contained" sx={{m:1}}>Submit</Button>
        </div>
      </Box>
    </Container>
    </>
  )
}

export default PostJob;