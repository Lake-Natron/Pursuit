const express = require('express');
require('dotenv').config();
const { getJob, searchJobs, getAllJobs } = require('../prisma/controllers/jobs.js');

let app = express();

// Routes

// get a specific job by id
app.get('/job', getJob);

// search for jobs with a variety of filters
app.get('/jobs/search', searchJobs)

// get all jobs
app.get('/jobs', getAllJobs)

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));