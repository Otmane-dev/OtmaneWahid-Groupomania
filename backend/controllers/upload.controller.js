const db = require("../models");
const { User } = db.sequelize.models;

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

exports.uploadProfil = (req, res) => {
  const fileName = req.file.filename;

  User.findAll({ where: { id: req.body.userId } }).then((user) => {
    user[0].picture = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    user[0].set(user[0]);
    user[0]
      .save()
      .then(() => {
        console.log(user[0])
        delete user[0].dataValues.password;
        user[0]["_id"] = user[0].dataValues.id;
        res.status(200).json(user[0].dataValues);
      })
      .catch((error) => res.status(400).json({ message: error }));
  });
};

/* exports.getProfilPic = (req, res) => {
  User.findAll({ where: { id: req.body.userId } })
    .then((user) => {
      res.status(200).json(user[0].dataValues.picture);
    })
    .catch((error) => res.status(400).json({ message: error }));
}; */
