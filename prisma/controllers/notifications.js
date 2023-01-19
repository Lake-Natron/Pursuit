const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNotifications = async (req, res) => {
  const { user_id } = req.query;
  const notifications = await prisma.Notification.findMany({
    where: {
      user_id: Number(user_id),
      read: {
        equals: false
      }
    }
  });
  res.send(notifications);
}

const createNotification = async (req, res) => {
  const notification = await prisma.Notification.create({
    data: {
      user_id: req.body.user_id,
      type: req.body.type,
      details: req.body.details,
      read: false
    }
  })
  res.send(notification);
}

const markNotificationRead = async (req, res) => {
  const notification = await prisma.Notification.update({
    where: {
      id: Number(req.body.id)
    },
    data: {
      read: true
    }
  })
  res.send(notification);
}

module.exports = { getNotifications, createNotification, markNotificationRead }