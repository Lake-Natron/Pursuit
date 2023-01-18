const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getJob = async (req, res) => {
  const { job_id } = req.query;
  const job = await prisma.Job.findUnique({
    where: { id: Number(job_id) },
    include: {
      User: {
        select: {
          company_name: true,
          email: true
        }
      }
    }
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
      User: {
        company_name: {
          contains: company_name,
          mode: 'insensitive'
        }
      }
    },
    include: {
      User: {
        select: {
          company_name: true,
          email: true
        }
      }
    }
  });
  res.send(jobs);
}

const getAllJobs = async (req, res) => {
  const { company_id } = req.query;
  const jobs = await prisma.Job.findMany({
    where: { company_id: Number(company_id) || undefined }
  });
  res.send(jobs);
}

const addJob = async (req, res) => {
  let skills = req.body.skills;
  skills = skills.split(", ");
  skills = skills.map((skill) => {
    return { "skill": skill };
  })

  const job = await prisma.Job.create({
    data: {
      name: req.body.title,
      company_id: req.body.company_id,
      description: req.body.jobDescription,
      salary: req.body.salary,
      location: req.body.location,
      close_date: new Date(req.body.close_date),
      experience_type: req.body.experienceType,
      employment_type: req.body.employmentType,
      jobsite: req.body.jobSite,
      Skill: {
        create: skills
      }
    }
  });
  res.send(job);
}

module.exports = { getJob, searchJobs, getAllJobs, addJob }