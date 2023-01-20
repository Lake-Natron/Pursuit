import React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import JobSearchList from '../src/JobSearchList.jsx'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import NavBar from '../src/navBar';import Modal from '@mui/material/Modal';
import { useSession, signOut } from "next-auth/react";
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Router from 'next/router'
import SearchBar from '../src/SearchBar.jsx'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:390,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: 4,
};


const Jobs =  () => {

  const [jobs, setJobs] = useState([])
  const [currentJob, setCurrentJob] = useState({})
  const [companyName, setCompanyName] = useState("")
  const [interestLevel,setInterestLevel] = useState("")
  const [searchParams, setSearchParams] = useState({})
  const { status, data } = useSession();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [clear, setClear] = useState(false);
  const [originalJobs,setOriginalJobs] = useState([])
  
  const handleClear = () => {
    setClear(false);
    setJobs(originalJobs)
  }
  const handleJob = (job, event) => {
    setCurrentJob(job)
    setCompanyName(job.User.company_name)
  }

  const handleChange = (event) => {
    setInterestLevel(event.target.value);
  };

  const handleApply = () => {
    axios.post('http://localhost:3001/apply',{
        job_id: currentJob.id,
        seeker_id: data.user.id,
        seeker_interest_level: interestLevel
    })
    handleClose()
  }

  
  const handleSearch = (e) => {
    console.log(searchParams)
    axios.get('http://localhost:3001/jobs/search/',{params: {
     employment_type: searchParams.employment_type,
     description: searchParams.description,
     job_site: searchParams.job_site
    }})
    .then((res) => {
      setJobs(res.data)
      setClear(true)
    })

  }

  const numberWithCommas = (x) => {
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'seeker') Router.replace("/login");
    axios.get('http://localhost:3001/jobs')
      .then((res) => {
        setOriginalJobs(res.data)
        setJobs(res.data)
        setCurrentJob(res.data[0])
        setCompanyName(res.data[0].User.company_name)
      })
    }, [])

    return(
        <div>
          <NavBar />
         <Box height="100vh" display="flex" flexDirection="column"> 
        <SearchBar clear = {clear} handleSearch = {handleSearch} handleClear={handleClear} setSearchParams={setSearchParams} searchParams={searchParams}/>
        <Grid container spacing={2} columns={16} sx={{ m: '5px'}}>
          <Grid item xs={5}>
            <List>
            {jobs.map((job,key) => {return (
              <div key = {key}>
              <JobSearchList handleJob = {handleJob} job = {job}/>
              </div>
            )
            })}
            </List>
          </Grid>
          <Divider orientation="vertical"  sx={{ m: '18px'}} />
          <Grid item xs={9.8} sx={{ mt: '8px', borderRadius: '16px', bgcolor: '#CFCFCF'}}>
            <Typography variant = "h1">{currentJob.name}</Typography>
            <Typography variant = "h2">{companyName}</Typography>
            <Typography variant = "body4">${numberWithCommas(currentJob.salary)} a year • {
            currentJob.employment_type} • {currentJob.location}</Typography>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button onClick={handleOpen} variant="contained" size="large" color="secondary">Apply</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
            <IconButton sx={{position: 'absolute', top: '7%', left: '90%'}} onClick={handleClose}>
                            <CloseIcon />
                      </IconButton>
            <Typography id="modal-modal-title" variant="h1" component="h2">
            Application Submission:
            </Typography>
            <Typography variant='h2'> {currentJob.name}, {companyName}</Typography>
            <br></br>
            <Typography id="modal-modal-description" variant='body3'sx={{ mt: 2 }}>
            My interest level:
            </Typography>
            <br/>

            <br/>
            <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel color ="secondary" >Interest Level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={interestLevel}
            label="Interest Level"
            onChange={handleChange}
            color="secondary"
          >
            <MenuItem value={"Interested"}>Interested</MenuItem>
            <MenuItem value={"Very Interested"}>Very Interested</MenuItem>
            <MenuItem value={"Extremely Interested"}>Extremely Interested</MenuItem>
          </Select>
        </FormControl>
      </Box>
          <br/>
            <Typography variant='body1' color ="secondary">
            *This information is for you and will not be shared with employers
            </Typography>
            <br/>
            <Button onClick={handleApply} variant="contained" size="large" color="secondary">submit application</Button>
            </Box>
            </Modal>

            <Divider orientation="horozontal"  sx={{ m: '18px'}} />
              <Typography style={{ maxHeight: 600, padding: "5px", overflow: 'auto', whiteSpace: "pre-wrap" }}>
            {currentJob.description}
            </Typography>
            <br/>
          </Grid>
        </Grid>
        </Box>
        </div>
    )
    }


export default Jobs;