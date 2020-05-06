
const logger = require('../utils/winston');

exports.testEndpoint = async (req, res, next) => {
  try {
    res.status(200).json({ test: 'OK' });
    logger.debug('This was a test');
  } catch (error) {
    next(error); // this will go to the error handler in app.js e.g. if there's a db error above
  }
};
