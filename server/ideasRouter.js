const express = require('express');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const ideasRouter = express.Router();

ideasRouter.get('/', (request, response) => {
  response.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (request, response) => {
  const { ideaId } = request.params;

  if (isNaN(ideaId)) {
    return response.status(404).send('Invalid idea ID');
  }

  const idea = getFromDatabaseById('ideas', ideaId);

  if (!idea) {
    return response.status(404).send('Idea not found');
  }

  response.send(idea);
});

module.exports = ideasRouter;