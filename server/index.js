const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { getJob, searchJobs, getAllJobs, addJob } = require('../prisma/controllers/jobs.js');
const { getUser, getAllUsers, addUser } = require('../prisma/controllers/users.js');


let app = express();
app.use(cors());
app.use(express.json());

// Routes

// get a specific job by id
app.get('/job', getJob);

// search for jobs with a variety of filters
app.get('/jobs/search', searchJobs);

// get all jobs
app.get('/jobs', getAllJobs);

// add a job
app.post('/job', addJob);

// get a specific job seeker by id
app.get('/user', getUser);

app.listen(process.env.PORT, () => console.log('Listening on port 3001'));
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// app.get('/jobs', async (req, res) => {
//   const jobs = await prisma.Job.findMany();
//   res.json(jobs);
// })
// get all job seekers
app.get('/users', getAllUsers);

// add a user
app.post('/user', addUser);

// app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));
