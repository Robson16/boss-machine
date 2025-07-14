const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabaseById,
} = require('./db');

const ideasRouter = express.Router();

ideasRouter.param('ideaId', (request, response, next, id) => {
  const idea = getFromDatabaseById('ideas', id);

  if (!idea) {
    return response.status(404).send('Idea not found or invalid ID.');
  }

  // Attach the idea to the request object for use in subsequent handlers
  request.idea = idea;

  next();
});

ideasRouter.get('/', (request, response) => {
  return response.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (request, response) => {
  return response.send(request.idea);
});

ideasRouter.post('/', checkMillionDollarIdea, (request, response) => {
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

  return response.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (request, response) => {
  const updatedIdeaObject = request.body;

  if (!updatedIdeaObject) {
    return response.status(400).send('Invalid idea data');
  }

  const updatedIdea = updateInstanceInDatabase('ideas', {
    ...updatedIdeaObject,
    id: request.idea.id,
  });

  if (!updatedIdea) {
    return response.status(400).send('Failed to update idea');
  }

  return response.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (request, response) => {
  const deleted = deleteFromDatabaseById('ideas', request.idea.id);

  if (!deleted) {
    return response.status(400).send('Failed to delete idea');
  }

  response.status(204).send();
});

module.exports = ideasRouter;