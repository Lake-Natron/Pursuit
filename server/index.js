const express = require('express');
require('dotenv').config();
const { getJob, searchJobs, getAllJobs, addJob } = require('../prisma/controllers/jobs.js');

let app = express();
app.use(express.json());

// Routes

// get a specific job by id
app.get('/job', getJob);

// search for jobs with a variety of filters
app.get('/jobs/search', searchJobs)

// get all jobs
app.get('/jobs', getAllJobs)

// add a job
app.post('/job', addJob)

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));