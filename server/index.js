const express = require('express');
require('dotenv').config();
const { getJob, searchJobs, getAllJobs, addJob } = require('../prisma/controllers/jobs.js');
const { getUser, getAllUsers, addUser } = require('../prisma/controllers/users.js');
const { applyToJob, getJobsAppliedTo, getApplicants, updateSeekerInterest } = require('../prisma/controllers/applications.js');

let app = express();
app.use(express.json());

// Routes

// get a specific job with job_id as parameter
app.get('/job', getJob);

// search for jobs with a variety of filters
app.get('/jobs/search', searchJobs);

// get all jobs (optional parameter for company_id)
app.get('/jobs', getAllJobs);

// add a job
app.post('/job', addJob);

// get a specific job seeker by id
app.get('/user', getUser);

// get all job seekers
app.get('/users', getAllUsers);

// add a user
app.post('/user', addUser);

// apply to a job
app.post('/apply', applyToJob);

// update applicant interest level
app.patch('/updateSeekerInterest', updateSeekerInterest);

// get all jobs that a job seeker has applied to
app.get('/jobs/applied', getJobsAppliedTo);

// get all applicants for a specific job
app.get('/jobs/applicants', getApplicants);

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));