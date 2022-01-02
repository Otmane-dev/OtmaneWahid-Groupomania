const db = require("../models");
const { Post, User, Like, Comments } = db.sequelize.models;
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const jwt = require("jsonwebtoken");
let comments;
let likes;

module.exports.readPost = (req, res) => {
  Comments.findAll({ order: [["createdAt", "ASC"]] }).then((comments) => {
    Like.findAll().then((likes) => {
      Post.findAll({ order: [["createdAt", "DESC"]] })
        .then((posts) => {
          let postGood = [];
          posts.forEach((p) => {
            p.dataValues["_id"] = p.dataValues.id;
            p.dataValues["comments"] = getCommentsOfPost(p, comments);
            p.dataValues["likers"] = getLikesOfLike(p, likes);
            postGood.push(p.dataValues);
          });
          //res.json(comments)
          res.status(200).json(postGood);
        })
        .catch((error) => res.status(400).json({ error }));
    });
  });
};

/**
 *
 * @param {un post donné} post
 * @param {la liste de tous les commentaires en bd} comments
 * @returns {la liste de tous les commentaires liés au post passé en argument}
 */
function getCommentsOfPost(post, comments) {
  let commentFound = [];
  if (comments.length > 0) {
    comments.forEach((c) => {
      if (c.messageId === post.id) {
        c["_id"] = c.id;
        commentFound.push(c);
      }
    });
  }
  return commentFound;
}
/**
 *
 * @param {un post donné} post
 * @param {la liste de tous les likes en bd} likes
 * @returns {la liste de tous les likes liés au posts passé en argument}
 */
function getLikesOfLike(post, likes) {
  let likeFound = [];
  if (likes.length > 0) {
    likes.forEach((l) => {
      if (l.messageId === post.id && l.isLike === 1) {
        likeFound.push(l);
      }
    });
  }
  return likeFound;
}

module.exports.createPost = async (req, res) => {
  const fileName = req.file? req.file.filename : "";

  const newPost = new Post({
    UserId: req.body.posterId,
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? `${req.protocol}://${req.get("host")}/images/${fileName}`: "",
    video: req.body.video,
  });

  try {
    const post = await newPost.save();
    post["likers"] = [];
    post["comments"] = [];
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  Post.findAll({ where: { id: req.params.id } })
    .then((post) => {
      post[0].update(req.body);
    })
    .then(() => {
      res.status(200).json("Post updated");
    })
    .catch((error) => res.status(400).json({ message: error }));
};

module.exports.deletePost = (req, res) => {
  Post.findAll({ where: { id: req.params.id } })
    .then((post) => post[0].destroy({ id: req.params.id }))
    .then(() => res.status(200).json({ message: "Successfully deleted. " }))
    .catch((error) => res.status(400).json({ message: error }));
};

module.exports.likePost = async (req, res) => {
  const newLike = new Like({
    userId: req.body.userId,
    messageId: req.body.postId,
    isLike: 1,
  });
  try {
    const like = await Like.upsert(newLike.dataValues);
    res.status(200).json("You liked");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  Like.findAll({
    where: { messageId: req.params.id, userId: req.body.id },
  })
    .then((like) => {
      like[0].update({ isLike: 0 }); //Set the isLike value to 0 to mean
    })
    .then(() => {
      res.status(200).json("You unliked");
    })
    .catch((error) => res.status(400).json({ message: error }));
};

module.exports.commentPost = async (req, res) => {
  const newComment = new Comments({
    userId: req.body.commenterId,
    messageId: req.body.postId,
    commentsId: "",
    content: req.body.text,
  });
  try {
    const comment = await newComment.save();
    res.status(200).json("Message crée");
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  Comments.findAll({ where: { id: req.body.commentId } })
    .then((com) => {
      com[0].update({content: req.body.text});
    })
    .then(() => {
      res.status(200).json("Comment updated");
    })
    .catch((error) => res.status(400).json({ message: error }));
};

module.exports.deleteCommentPost = (req, res) => {
  Comments.findAll({ where: { id: req.body.commentId } })
  .then((com) => com[0].destroy({ id: req.body.commentId }))
  .then(() =>{
   res.status(200).json({ message: "Successfully deleted." })
  })
  .catch((error) => res.status(400).json({ message: error }));
};


