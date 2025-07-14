const express = require('express');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const minionsRouter = express.Router();

minionsRouter.get('/', (request, response) => {
  response.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (request, response) => {
  const { minionId } = request.params;

  if (isNaN(minionId)) {
    return response.status(404).send('Invalid minion ID');
  }

  const minion = getFromDatabaseById('minions', minionId);

  if (!minion) {
    return response.status(404).send('Minion not found');
  }

  response.send(minion);
})

minionsRouter.post('/', (request, response) => {
  const newMinionObject = request.body;

  // Validate that the required fields are present
  if (!newMinionObject.name || !(newMinionObject.salary >= 0)) {
    return response.status(400).send('Missing required fields');
  }

  // Add the new minion to the database
  const newMinion = addToDatabase('minions', newMinionObject);

  if (!newMinion) {
    return response.status(400).send('Invalid minion data');
  }

  response.status(201).send(newMinion);
});

minionsRouter.put('/:minionId', (request, response) => {
  const { minionId } = request.params;
  const updatedMinionObject = request.body;

  if (isNaN(minionId)) {
    return response.status(404).send('Invalid minion ID');
  }

  const minion = getFromDatabaseById('minions', minionId);

  if (!minion) {
    return response.status(404).send('Minion not found');
  }

  if (!updatedMinionObject) {
    return response.status(400).send('Invalid minion data');
  }

  const updatedMinion = updateInstanceInDatabase('minions', {
    ...updatedMinionObject,
    id: minionId,
  });

  if (!updatedMinion) {
    return response.status(400).send('Failed to update minion');
  }

  response.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (request, response) => {
  const { minionId } = request.params;

  if (isNaN(minionId)) {
    return response.status(404).send('Invalid minion ID');
  }

  const minion = getFromDatabaseById('minions', minionId);

  if (!minion) {
    return response.status(404).send('Minion not found');
  }

  const deleted = deleteFromDatabasebyId('minions', minionId);

  if (!deleted) {
    return response.status(400).send('Failed to delete minion');
  }

  response.status(204).send();
});

module.exports = minionsRouter;