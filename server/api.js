const express = require('express');
const minionsRouter = require('./minionsRouter');
const ideasRouter = require('./ideasRouter');

const apiRouter = express.Router();

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
