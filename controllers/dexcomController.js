const db = require("../models/dexcom.js");

// Defining methods for the dexcomsController
module.exports = {
  findAll: function(req, res) {
    db.dexcom
      .find(req.query)
      .sort({ date: -1 })
      .then(dbdexcom => res.json(dbdexcom))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.dexcom
      .findById(req.params.id)
      .then(dbdexcom => res.json(dbdexcom))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.dexcom
      .create(req.body)
      .then(dbdexcom => res.json(dbdexcom))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.dexcom
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbdexcom => res.json(dbdexcom))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.dexcom
      .findById({ _id: req.params.id })
      .then(dbdexcom => dbdexcom.remove())
      .then(dbdexcom => res.json(dbdexcom))
      .catch(err => res.status(422).json(err));
  }
};