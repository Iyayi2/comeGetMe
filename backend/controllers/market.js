const Listing = require('../models/listing');

exports.getListings = (req, res, next) => {
  Listing.find()
    .then((listings) => {
      res.status(200).json(listings);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getPopulatedListings = (req, res, next) => {
  Listing.find()
    .populate('userId', 'username')
    .then((listings) => {
      res.status(200).json(listings);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// view json on http://localhost:3000/
exports.getIndex = (req, res, next) => {
  Listing.find()
    .then((listings) => {
      res.status(200).json(listings);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
};
