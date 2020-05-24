
const Bin = require('../models/Bin');

exports.createBin = async (req, res, next) => {
  try {
    const bin = new Bin(req.body);
    const doc = await bin.save();
    // eslint-disable-next-line no-underscore-dangle
    res.status(201).json({ binId: doc._id });
  } catch (error) {
    next(error); // this will go to the error handler in app.js e.g. if there's a db error above
  }
};

exports.getAllBins = async (req, res, next) => {
  try {
    const list = await Bin.find({}).lean().exec();
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
