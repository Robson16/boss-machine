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

ideasRouter.post('/', (request, response) => {
  const newIdeaObject = request.body;

  if (
    !newIdeaObject.name ||
    !newIdeaObject.weeklyRevenue ||
    !newIdeaObject.numWeeks
  ) {
    return response.status(400).send('Missing required fields');
  }

  const newIdea = addToDatabase('ideas', newIdeaObject);

  if (!newIdea) {
    return response.status(400).send('Invalid idea data');
  }

  response.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', (request, response) => {
  const { ideaId } = request.params;
  const updatedIdeaObject = request.body;

  if (isNaN(ideaId)) {
    return response.status(404).send('Invalid idea ID');
  }

  const idea = getFromDatabaseById('ideas', ideaId);

  if (!idea) {
    return response.status(404).send('Idea not found');
  }

  if (!updatedIdeaObject) {
    return response.status(400).send('Invalid idea data');
  }

  const updatedIdea = updateInstanceInDatabase('ideas', {
    ...updatedIdeaObject,
    id: ideaId,
  });

  if (!updatedIdea) {
    return response.status(400).send('Failed to update idea');
  }

  response.send(updatedIdea);
});

module.exports = ideasRouter;