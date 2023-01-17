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
  const { company_id, experience_type, employment_type, jobsite, salary_min, salary_max, description, name, company_name } = req.query;
  const jobs = await prisma.Job.findMany({
    where: {
      company_id: Number(company_id) || undefined,
      experience_type: experience_type,
      employment_type: employment_type,
      jobsite: jobsite,
      salary: {
        gte: Number(salary_min) || undefined,
        lte: Number(salary_max) || undefined
      },
      description: {
        contains: description,
        mode: 'insensitive'
      },
      name: {
        contains: name,
        mode: 'insensitive'
      },
      Company: {
        name: {
          contains: company_name,
          mode: 'insensitive'
        }
      }
    },
    include: {
      Company: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  res.send(jobs);
}

const getAllJobs = async (req, res) => {
  const jobs = await prisma.Job.findMany({
    include: {
      Company: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  res.send(jobs);
}

const addJob = async (req, res) => {
  const job = await prisma.Job.create({
    data: {
      name: req.body.name,
      company_id: req.body.company_id,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      close_date: new Date(req.body.close_date),
      experience_type: req.body.experience_type,
      employment_type: req.body.employment_type,
      jobsite: req.body.jobsite
    }
  });
  res.send(job);
}

module.exports = { getJob, searchJobs, getAllJobs, addJob }