const express = require('express');
require('dotenv').config();
let app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/job', async (req, res) => {
  const { id } = req.query;
  const job = await prisma.Job.findUnique({
    where: { id: Number(id) }
  });
  res.send(job);
})

app.get('/jobs/search', async (req, res) => {
  const { company_id, experience_type, employment_type, jobsite, salary_min, salary_max } = req.query;
  const jobs = await prisma.Job.findMany({
    where: {
      company_id: Number(company_id),
      experience_type: experience_type,
      employment_type: employment_type,
      jobsite: jobsite,
      salary: {
        gte: Number(salary_min) || 0,
        lte: Number(salary_max) || 1000000000
      }
    }
  });
  res.send(jobs);
})

app.get('/jobs', async (req, res) => {
  const jobs = await prisma.Job.findMany();
  res.send(jobs);
})

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));