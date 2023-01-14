const express = require('express');
require('dotenv').config();
let app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/jobs', async (req, res) => {
  const jobs = await prisma.Job.findMany();
  res.json(jobs);
})

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));