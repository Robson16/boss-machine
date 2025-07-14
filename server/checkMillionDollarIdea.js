const checkMillionDollarIdea = (request, response, next) => {
  const { weeklyRevenue, numWeeks } = request.body;

  if (!weeklyRevenue || isNaN(weeklyRevenue) || weeklyRevenue <= 0) {
    return response.status(400).send(
      'Weekly revenue required and must be a positive number.'
    );
  }

  if (!numWeeks || isNaN(numWeeks) || numWeeks <= 0) {
    return response.status(400).send(
      'Number of weeks required and must be a positive number.'
    );
  }

  if (weeklyRevenue * numWeeks < 1000000) {
    return response.status(400).send(
      'Idea must be worth at least one million dollars.'
    );
  }

  next(); // Call the next middleware or route handler if checks pass
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
