import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Pet extends Model {
    static associate(models: any) {
      if (models.User) Pet.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    }
  }
  
  Pet.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.STRING,
      },
      isAdoptionOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isFosterOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      city: {
        type: DataTypes.STRING,
      },
      healthStatus: {
        type: DataTypes.STRING, // Using string since ENUM isn't easily supported across all DB types without strict schema sync
        defaultValue: 'Healthy', 
      }
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
