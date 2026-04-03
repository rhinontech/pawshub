import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Vaccine extends Model {
    static associate(models: any) {
      if (models.Pet) Vaccine.belongsTo(models.Pet, { foreignKey: 'petId', as: 'pet' });
      if (models.User) Vaccine.belongsTo(models.User, { foreignKey: 'vetId', as: 'veterinarian' });
    }
  }
  
  Vaccine.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      petId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      vetId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateAdministered: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      nextDueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Vaccine",
    }
  );
  return Vaccine;
};
