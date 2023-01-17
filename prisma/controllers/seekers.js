const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSeeker = async (req, res) => {
  const { id } = req.query;
  const seeker = await prisma.Seeker.findUnique({
    where: { id: Number(id) }
  });
  res.send(seeker);
}

const getAllSeekers = async (req, res) => {
  const seekers = await prisma.Seeker.findMany();
  res.send(seekers);
}

const addUser = async (req, res) => {
  const seeker = await prisma.User.create({
    data: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      session_id: req.body.session_id,
      email: req.body.email,
      password: req.body.password
    }
  });
  res.send(seeker);
}

module.exports = { getSeeker, getAllSeekers, addSeeker }