const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addWorkExperience = async (req, res) => {

}

const addEducation = async (req, res) => {
  const education = await prisma.Education.create({
    data: {
      seeker_id: req.body.seeker_id,
      school: req.body.school,
      location: req.body.location,
      degree: req.body.degree,
      major: req.body.major,
      graduate: req.body.graduate,
      graduation_date: new Date(req.body.graduation_date)
    }
  });
  res.send(education);
}

const getEducation = async (req, res) => {
  const { seeker_id } = req.query;
  const education = await prisma.Education.findMany({
    where: {
      seeker_id: Number(seeker_id)
    }
  })
  res.send(education);
}

const deleteEducation = async (req, res) => {
  const response = await prisma.Education.delete({
    where: {
      id: Number(req.body.education_id)
    }
  })
  res.send(response);
}

module.exports = { addWorkExperience, addEducation, getEducation, deleteEducation }