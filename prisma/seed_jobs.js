const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

let jobs = [
  {
    name: 'Technical Recruiter',
    company_id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    salary: 80000,
    location: '27540',
    close_date: new Date('2023-01-31'),
    experience_type: 'Entry Level',
    employment_type: 'Full-Time',
    jobsite: 'Remote'
  },
  {
    name: 'Software Engineer',
    company_id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    salary: 100000,
    location: '37421',
    close_date: new Date('2023-01-31'),
    experience_type: 'Mid Level',
    employment_type: 'Full-Time',
    jobsite: 'Onsite'
  },
  {
    name: 'HR Generalist',
    company_id: 3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    salary: 65000,
    location: '11791',
    close_date: new Date('2023-01-31'),
    experience_type: 'Senior Level',
    employment_type: 'Part-Time',
    jobsite: 'Hybrid'
  },
  {
    name: 'Corporate Trainer',
    company_id: 4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    salary: 70000,
    location: '43512',
    close_date: new Date('2023-01-31'),
    experience_type: 'Executive Level',
    employment_type: 'Contract',
    jobsite: 'Remote'
  },
  {
    name: 'Front End Developer',
    company_id: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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