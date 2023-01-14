const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getJob = async (req, res) => {
  const { id } = req.query;
  const job = await prisma.Job.findUnique({
    where: { id: Number(id) }
  });
  res.send(job);
}

const searchJobs = async (req, res) => {
  const { company_id, experience_type, employment_type, jobsite, salary_min, salary_max } = req.query;
  const jobs = await prisma.Job.findMany({
    where: {
      company_id: Number(company_id) || undefined,
      experience_type: experience_type,
      employment_type: employment_type,
      jobsite: jobsite,
      salary: {
        gte: Number(salary_min) || undefined,
        lte: Number(salary_max) || undefined
      }
    }
  });
  res.send(jobs);
}

const getAllJobs = async (req, res) => {
  const jobs = await prisma.Job.findMany();
  res.send(jobs);
}

module.exports = { getJob, searchJobs, getAllJobs }