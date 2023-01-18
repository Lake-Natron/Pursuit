const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const { id } = req.query;
  const seeker = await prisma.User.findUnique({
    where: { id: Number(id) }
  });
  res.send(seeker);
}

const getAllUsers = async (req, res) => {
  const users = await prisma.User.findMany();
  res.send(users);
}

const addUser = async (req, res) => {
  const {company_name} = req.body

  // const user = await prisma.User.create({
  //   data: {
  //     company_name: req.body.company_name,
  //     first_name: req.body.first_name,
  //     last_name: req.body.last_name,
  //     image_url: req.body.image_url,
  //     role: req.body.role,
  //     email: req.body.email,
  //     password: req.body.password,
  //     address: req.body.address,
  //     address_2: req.body.address_2,
  //     city: req.body.city,
  //     state: req.body.state,
  //     zip_code: req.body.zip_code,
  //     pdf_url: req.body.pdr_url
  //   }
  // });
  // res.send(user);
  // res.end();
}

module.exports = { getUser, getAllUsers, addUser }