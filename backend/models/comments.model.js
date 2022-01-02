"use strict";
module.exports = (sequelize, DataTypes) => {
  var Comments = sequelize.define(
    "Comments",
    {
      messageId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Post",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      content: DataTypes.STRING,
      commentsId: DataTypes.STRING,
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        allowNull: false,
      },
    },
    {}
  );
  Comments.associate = function (models) {
    // associations can be defined here
    models.User.belongsToMany(models.Post, {
      through: { model: models.Comments, unique: false },
      foreignKey: "userId",
      otherKey: "messageId",
    });

    models.Post.belongsToMany(models.User, {
      through: { model: models.Comments, unique: false },
      foreignKey: "messageId",
      otherKey: "userId",
    });

    models.Comments.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    models.Comments.belongsTo(models.Post, {
      foreignKey: "messageId",
      as: "post",
    });
  };
  return Comments;
};
