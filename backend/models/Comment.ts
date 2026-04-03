import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Comment extends Model {
    static associate(models: any) {
      if (models.Post) Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
      if (models.User) Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
    }
  }

  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
