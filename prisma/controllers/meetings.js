const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createMeeting = async (req, res) => {
  const meeting = await prisma.Meeting.create({
    data: {
      seeker_id: req.body.seeker_id,
      company_id: req.body.company_id,
      start_time: new Date(req.body.start_time),
      end_time: new Date(req.body.end_time),
      description: req.body.description,
      application_id: req.body.application_id,
      private: req.body.private,
      title: req.body.title,
      canceled: false
    }
  })
  res.send(meeting);
}

const getMeetings = async (req, res) => {
  const { seeker_id, company_id } = req.query;
  const meetings = await prisma.Meeting.findMany({
    where: {
      seeker_id: Number(seeker_id) || undefined,
      company_id: Number(company_id) || undefined,
      canceled: {
        equals: false
      }
    },
    include: {
      Application: {
        select: {
          company_notes: true,
          seeker_notes: true,
          User: {
            select: {
              first_name: true,
              last_name: true,
            }
          },
          Job: {
            select: {
              User: {
                select: {
                  company_name: true
                }
              }
            }
          }
        }
      }
    }
  })
  res.send(meetings);
}

const editMeeting = async (req, res) => {
  const updated = await prisma.Meeting.update({
    where: {
      id: Number(req.body.id)
    },
    data: {
      title: req.body.title,
      start_time: new Date(req.body.start_time),
      end_time: new Date(req.body.end_time),
      description: req.body.description,
      seeker_accepted: req.body.seeker_accepted,
      canceled: req.body.canceled
    }
  })
  res.send(updated);
}

module.exports = { createMeeting, getMeetings, editMeeting }