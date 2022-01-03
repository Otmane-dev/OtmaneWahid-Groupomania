
const db = require("../models");
const { User, Post } = db.sequelize.models;

exports.getAllUsers = async (req, res) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.userInfo = (req, res) => {
  User.findAll({ where: { id: req.params.id } })
    .then((users) => {
      delete users[0].dataValues.password;
      users[0].dataValues["_id"] = users[0].dataValues.id;
      res.status(200).json(users[0].dataValues);
    })
    .catch((error) => res.status(400).json({ message: "erreur" }));
};

exports.updateUser = async (req, res) => {
  User.findAll({ where: { id: req.params.id } })
    .then((users) => users[0].update(req.body))
    .then(() => {
      User.findAll({ where: { id: req.params.id } }).then((users) => {
        delete users[0].dataValues.password;
        users[0].dataValues["_id"] = users[0].dataValues.id;
        res.status(200).json(users[0].dataValues);
      });
    })
    .catch((error) => res.status(400).json({ message: error }));
};

exports.deleteUser = async (req, res) => {
  User.findAll({ where: { id: req.params.id } })
    .then((users) => {
      Post.destroy({ where: { userId: req.params.id } }).then((resultat) => {
        users[0].destroy({ id: req.params.id });
      });
    })
    .then(() => res.status(200).json({ message: "Successfully deleted. " }))
    .catch((error) => res.status(400).json({ message: error }));
};


