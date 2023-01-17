const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNotifications = async(req, res) => {
  const { id } = req.query;
  const notifications = await prisma.Notification.findUnique({
    where: { id: Number(id) }
  });
  res.send(notifications);
}