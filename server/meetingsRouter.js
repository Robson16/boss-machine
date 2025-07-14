const express = require('express');
const {
  getAllFromDatabase,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require('./db');

const meetingsRouter = express.Router();

meetingsRouter.get('/', (request, response) => {
  return response.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (request, response) => {
  // Auto generate new meetings
  const newMeetingObject = createMeeting();

  if (!newMeetingObject) {
    return response.status(500).send('Could not create a new meeting');
  }

  const newMeeting = addToDatabase('meetings', newMeetingObject);

  if (!newMeeting) {
    return response.status(400).send('Invalid meeting data');
  }

  return response.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (request, response) => {
  deleteAllFromDatabase('meetings');
  return response.status(204).send();
});

module.exports = meetingsRouter;