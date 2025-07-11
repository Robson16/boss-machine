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


module.exports = minionsRouter;