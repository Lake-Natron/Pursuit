const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const applyToJob = async (req, res) => {
  const application = await prisma.Application.create({
    data: {
      job_id: req.body.job_id,
      seeker_id: req.body.seeker_id,
      seeker_interest_level: req.body.seeker_interest_level
    }
  });
  res.send(application);
}

const updateSeekerInterest = async (req, res) => {
  const { application_id, seeker_interest_level } = req.body;
  const updated = await prisma.Application.update({
    where: {
      id: Number(application_id)
    },
    data: {
      seeker_interest_level: seeker_interest_level
    }
  })
  res.send(updated);
}

const updateSeekerNotes = async (req, res) => {
  const { application_id, seeker_notes } = req.body;
  const updated = await prisma.Application.update({
    where: {
      id: Number(application_id)
    },
    data: {
      seeker_notes: seeker_notes
    }
  })
  res.send(updated);
}

const updateCompanyInterest = async (req, res) => {
  const { application_id, company_interest_level } = req.body;
  const updated = await prisma.Application.update({
    where: {
      id: Number(application_id)
    },
    data: {
      company_interest_level: company_interest_level
    }
  })
  res.send(updated);
}

const updateCompanyNotes = async (req, res) => {
  const { application_id, company_notes } = req.body;
  const updated = await prisma.Application.update({
    where: {
      id: Number(application_id)
    },
    data: {
      company_notes: company_notes
    }
  })
  res.send(updated);
}

const getJobsAppliedTo = async (req, res) => {
  const { seeker_id } = req.query;
  const jobs = await prisma.Application.findMany({
    where: { seeker_id: Number(seeker_id) || undefined },
    include: {
      User: true,
      Job: true
    }
  });
  res.send(jobs);
}

const getApplicants = async (req, res) => {
  const { job_id } = req.query;
  const applications = await prisma.Application.findMany({
    where: { job_id: Number(job_id) || undefined },
    include: {
      User: {
        select: {
          first_name: true,
          last_name: true,
          email: true,
          image_url: true
        }
      },
      Job: {
        select: {
          name: true
        }
      }
    }
  });
  res.send(applications);
}

module.exports = { getJobsAppliedTo, applyToJob, getApplicants, updateSeekerInterest, updateCompanyInterest, updateSeekerNotes, updateCompanyNotes }