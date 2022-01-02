"use strict";
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define(
    "Like",
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
      isLike: DataTypes.INTEGER,
    },
    {}
  );
  Like.associate = (models) => {
    // associations can be defined here

    models.User.belongsToMany(models.Post, {
      through: models.Like,
      foreignKey: "userId",
      otherKey: "messageId",
    });

    models.Post.belongsToMany(models.User, {
      through: models.Like,
      foreignKey: "messageId",
      otherKey: "userId",
    });

    models.Like.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    models.Like.belongsTo(models.Post, {
      foreignKey: "messageId",
      as: "post",
    });
  };
  return Like;
};
