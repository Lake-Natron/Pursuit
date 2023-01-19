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
  const {company_name, first_name, last_name, image_url, role, email, password, address, address_2, city, state, zip_code, pdf_url} = req.body

  console.log(req.body)

  if (!email || !password) res.status(400).json({'message': 'Email and Password are required'})
  else {
  try {
    if (email) {
      const findDuplicateEmail = await prisma.User.findUnique({
        where: {email}
      })
      if (findDuplicateEmail) res.status(409).json({'message': 'Email already taken'});
    }
    else if (company_name) {
      const findDuplicateCompanyName = await prisma.User.findUnique({
        where: {company_name}
      })

      if (findDuplicateCompanyName) res.status(409).json({'message': 'Company signed up already!'});
    }

      const hashedPwd = await bcrypt.hash(password, 10);

      let newUser = {company_name, first_name, last_name, image_url, role, email, address, address_2, city, state, zip_code, pdf_url}

      newUser.password = hashedPwd
      newUser.pdf_url = null;

      console.log(newUser)

      await prisma.User.create({data: newUser});
      res.status(201).json({'success': `New user ${email} created!`})

    } catch (err) {
    console.log(err.message)
    // res.status(500).json({'message' : err.message});
    }
  }


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