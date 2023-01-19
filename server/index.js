const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getJob, searchJobs, getAllJobs, addJob } = require('../prisma/controllers/jobs.js');
const { getUser, getAllUsers, addUser } = require('../prisma/controllers/users.js');
const { applyToJob, getJobsAppliedTo, getApplicants, updateSeekerInterest, updateCompanyInterest, updateSeekerNotes, updateCompanyNotes } = require('../prisma/controllers/applications.js');
const { addEducation, getEducation, deleteEducation, addWorkExperience, getWorkExperience, deleteWorkExperience, updateEducation, updateWorkExperience, addSkills, getSkills } = require('../prisma/controllers/resumes.js');
const { createMeeting, getMeetings, editMeeting } = require('../prisma/controllers/meetings.js');
const { createNotification, getNotifications, markNotificationRead } = require('../prisma/controllers/notifications.js');


let app = express();

app.use(cors());
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

// app.listen(process.env.PORT, () => console.log('Listening on port 3001'));
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
// apply to a job
app.post('/apply', applyToJob);

// update applicant interest level
app.patch('/updateSeekerInterest', updateSeekerInterest);

// update company interest level
app.patch('/updateCompanyInterest', updateCompanyInterest);

// update applicant notes
app.patch('/updateSeekerNotes', updateSeekerNotes);

// update company notes
app.patch('/updateCompanyNotes', updateCompanyNotes);

// get all jobs that a job seeker has applied to
app.get('/jobs/applied', getJobsAppliedTo);

// get all applicants for a specific job
app.get('/jobs/applicants', getApplicants);

// add education for seeker
app.post('/education', addEducation);

// add education for seeker
app.patch('/updateEducation', updateEducation);

// get all education for seeker
app.get('/education', getEducation);

// delete education with education id
app.delete('/education', deleteEducation);

// add work experience for seeker
app.post('/workExperience', addWorkExperience);

// add education for seeker
app.patch('/workExperience', updateWorkExperience);

// get all work experience for seeker
app.get('/workExperience', getWorkExperience);

// delete work experience with work experience id
app.delete('/workExperience', deleteWorkExperience);

// add seeker skills
app.post('/skills', addSkills);

// get all skills for seeker
app.get('/skills', getSkills);

// create a meeting
app.post('/meeting', createMeeting);

// get meetings with seeker_id and company_id
app.get('/meetings', getMeetings);

// edit meeting
app.patch('/meeting', editMeeting);

// create a notification
app.post('/notification', createNotification);

// get a user's notifications
app.get('/notifications', getNotifications);

// mark a specific notification read
app.patch('/notification', markNotificationRead);

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));
