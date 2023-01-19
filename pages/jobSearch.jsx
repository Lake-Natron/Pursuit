import React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import JobSearchList from '../src/JobSearchList.jsx'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';


const Jobs =  () => {

const [jobs, setJobs] = useState([])
const [currentJob, setCurrentJob] = useState({})

const handleJob = (job, event) => {
  setCurrentJob(job)

}
useEffect(() => {
  axios.get('http://localhost:3001/jobs')
    .then((res) => {
      setJobs(res.data)
      setCurrentJob(res.data[0])
    })
}, [])

    return (
      <div>
      <Box height="100vh" display="flex" flexDirection="column"> 
      <TextField 
          id="search"
          label="Search"
          type="search"
          variant="outlined"
          color="secondary"
          sx={{ m: '18px'}}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          />
        
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
          <Typography variant = "h2">{currentJob.company_id}</Typography> 
          <br/>
            <Typography style={{ maxHeight: 600, padding: "5px", overflow: 'auto', whiteSpace: "pre-wrap" }}>
           {currentJob.description}
           </Typography>
           <br/>
        <Button variant="contained" size="large" color="secondary">Apply</Button>
        </Grid> 
      </Grid> 
      </Box>
      </div>

    )

    
  }
  

  export default Jobs;