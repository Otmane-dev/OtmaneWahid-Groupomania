//const User = require("../models/user.model");
//const ObjectID = require("mongoose").Types.ObjectId;
const db = require("../models");
const { User, Post } = db.sequelize.models;

exports.getAllUsers = async (req, res) => {
  //const users = await User.find().select("-password");
  // res.status(200).json(users);
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

/*exports.follow = async (req, res) => {
 
  try {
    // add to the follower list
    await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // add to following list
    await User.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};*/

/*exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // remove to following list
    await User.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};*/
