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

module.exports = minionsRouter;