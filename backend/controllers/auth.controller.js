const db = require("../models");
const { User } = db.sequelize.models;
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

exports.signUp = async (req, res, next) => {
  User.findAll({
    where: { email: req.body.email },
  })
    .then((user) => {
      console.log(user);
      if (user.length === 0) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            picture: "http://localhost:5000/images/default_avatar.jpg",
            date: "",
            bio: "",
            isAdmin: false,
          });
          user
            .save()
            .then(() => res.status(201).json({ user: user.id }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res.status(401).json({ error: "Utilisateur Existant !" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.signIn = async (req, res) => {
  User.findAll({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user[0].password)
        .then((pass) => {
          if (pass === false) {
            return res.status(401).json({
              message: "Wrong password !",
            });
          }
          const token = createToken(user[0].id);
          delete user[0].dataValues.password;
          res.cookie("jwt", token, { httpOnly: true, maxAge });
          res.status(200).json({
            user: user[0].id,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
