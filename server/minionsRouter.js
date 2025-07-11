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

module.exports = minionsRouter;