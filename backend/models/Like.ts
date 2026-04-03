import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Like extends Model {
    static associate(models: any) {
      if (models.Post) Like.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
      if (models.User) Like.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Like.init(
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
    },
    {
      sequelize,
      modelName: "Like",
      // Ensure a user can only like a post once
      indexes: [{ unique: true, fields: ['postId', 'userId'] }],
    }
  );
  return Like;
};
