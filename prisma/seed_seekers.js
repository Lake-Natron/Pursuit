const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

let seekers = [
  {
    company_name: '',
    first_name: 'Callie',
    last_name: 'Stoscup',
    image_url: '',
    role: "seeker",
    email: 'calliestoscupgmail.com',
    password: 'password_1',
    address: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
    pdf_url: ''
  },
  {
    company_name: '',
    first_name: 'John',
    last_name: 'Doe',
    image_url: '',
    email: 'johndoe@gmail.com',
    password: 'password_2',
    role: "seeker",
    address: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
    pdf_url: ''
  },
  {
    company_name: '',
    first_name: 'Jane',
    last_name: 'Doe',
    image_url: '',
    email: 'janedoe@gmail.com',
    password: 'password_3',
    role: "seeker",
    address: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
    pdf_url: ''
  },
  {
    company_name: '',
    first_name: 'Oprah',
    last_name: 'Winfrey',
    image_url: '',
    email: 'oprahwinfrey@gmail.com',
    password: 'password_4',
    role: "company",
    address: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
    pdf_url: ''
  },
  {
    company_name: '',
    first_name: 'Brad',
    last_name: 'Pitt',
    image_url: '',
    email: 'bradpitt@gmail.com',
    password: 'password_5',
    role: "company",  address: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
    pdf_url: ''
  }
];

async function main() {
  console.log('Start seeding...');

  for (let i = 0; i < seekers.length; i++) {
    const user = await prisma.User.create({
      data: seekers[i]
    })
    console.log(`Created user with id: ${user.id}`)
  }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

