const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

let jobs = [
  {
    name: 'Technical Recruiter',
    company_id: 17,
    description: 'Lorem ipsum dolor sit amet',
    salary: 80000,
    location: '27540',
    close_date: new Date('2023-01-31'),
    experience_type: 'Entry Level',
    employment_type: 'Full-Time',
    jobsite: 'Remote'
  },
  {
    name: 'Software Engineer',
    company_id: 9,
    description: 'Lorem ipsum dolor sit amet',
    salary: 100000,
    location: '37421',
    close_date: new Date('2023-01-31'),
    experience_type: 'Mid Level',
    employment_type: 'Full-Time',
    jobsite: 'Onsite'
  },
  {
    name: 'HR Generalist',
    company_id: 10,
    description: 'Lorem ipsum dolor sit amet',
    salary: 65000,
    location: '11791',
    close_date: new Date('2023-01-31'),
    experience_type: 'Senior Level',
    employment_type: 'Part-Time',
    jobsite: 'Hybrid'
  },
  {
    name: 'Corporate Trainer',
    company_id: 10,
    description: 'Lorem ipsum dolor sit amet',
    salary: 70000,
    location: '43512',
    close_date: new Date('2023-01-31'),
    experience_type: 'Executive Level',
    employment_type: 'Contract',
    jobsite: 'Remote'
  },
  {
    name: 'Front End Developer',
    company_id: 9,
    description: 'Lorem ipsum dolor sit amet',
    salary: 90000,
    location: '11111',
    close_date: new Date('2023-01-31'),
    experience_type: 'Entry Level',
    employment_type: 'Internship',
    jobsite: 'Remote'
  }
];

async function main() {
  console.log('Start seeding...');

  for (let i = 0; i < jobs.length; i++) {
    const job = await prisma.Job.create({
      data: jobs[i]
    })
    console.log(`Created user with id: ${job.id}`)
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