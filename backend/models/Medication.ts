import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Medication extends Model {
    static associate(models: any) {
      if (models.Pet) Medication.belongsTo(models.Pet, { foreignKey: 'petId', as: 'pet' });
    }
  }
  
  Medication.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dosage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    },
    {
      sequelize,
      modelName: "Medication",
    }
  );
  return Medication;
};
