import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Post extends Model {
    static associate(models: any) {
      if (models.User) Post.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
    }
  }
  
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING, // "pending", "approved", "rejected"
        defaultValue: 'pending',
      }
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
