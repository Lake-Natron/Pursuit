const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

let seekers = [
  {
    first_name: 'George',
    last_name: 'Bush',
    email: 'georgebush@gmail.com',
    image_url: 'https://media.istockphoto.com/id/523761634/photo/cute-panda-bear-climbing-in-tree.jpg?s=612x612&w=0&k=20&c=TxsmORsbuY1LpxQsc6T8fpWJo7lBwncciYhroAr8rXI=',
    role: 'seeker',
    address: '1234 Fake Dr',
    city: 'New York City',
    state: 'New York',
    zip_code: '10001',
    password: 'password_9',
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'password_5',
    image_url: 'https://media.istockphoto.com/id/523761634/photo/cute-panda-bear-climbing-in-tree.jpg?s=612x612&w=0&k=20&c=TxsmORsbuY1LpxQsc6T8fpWJo7lBwncciYhroAr8rXI=',
    role: 'seeker',
    address: '1234 Fake Dr',
    city: 'New York City',
    state: 'New York',
    zip_code: '10001'
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'janedoe@gmail.com',
    image_url: 'https://media.istockphoto.com/id/523761634/photo/cute-panda-bear-climbing-in-tree.jpg?s=612x612&w=0&k=20&c=TxsmORsbuY1LpxQsc6T8fpWJo7lBwncciYhroAr8rXI=',
    role: 'seeker',
    address: '1234 Fake Dr',
    city: 'New York City',
    state: 'New York',
    zip_code: '10001',
    password: 'password_6'
  },
  {
    first_name: 'Oprah',
    last_name: 'Winfrey',
    email: 'oprahwinfrey@gmail.com',
    image_url: 'https://media.istockphoto.com/id/523761634/photo/cute-panda-bear-climbing-in-tree.jpg?s=612x612&w=0&k=20&c=TxsmORsbuY1LpxQsc6T8fpWJo7lBwncciYhroAr8rXI=',
    role: 'seeker',
    address: '1234 Fake Dr',
    city: 'New York City',
    state: 'New York',
    zip_code: '10001',
    password: 'password_7'
  },
  {
    first_name: 'Brad',
    last_name: 'Pitt',
    email: 'bradpitt@gmail.com',
    image_url: 'https://media.istockphoto.com/id/523761634/photo/cute-panda-bear-climbing-in-tree.jpg?s=612x612&w=0&k=20&c=TxsmORsbuY1LpxQsc6T8fpWJo7lBwncciYhroAr8rXI=',
    role: 'seeker',
    address: '1234 Fake Dr',
    city: 'New York City',
    state: 'New York',
    zip_code: '10001',
    password: 'password_8'
  }
];

async function main() {
  console.log('Start seeding...');

  for (let i = 0; i < seekers.length; i++) {
    const seeker = await prisma.User.create({
      data: seekers[i]
    })
    console.log(`Created user with id: ${seeker.id}`)
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