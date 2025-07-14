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

module.exports = ideasRouter;