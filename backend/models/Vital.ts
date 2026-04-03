import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Vital extends Model {
    static associate(models: any) {
      if (models.Pet) Vital.belongsTo(models.Pet, { foreignKey: 'petId', as: 'pet' });
    }
  }
  
  Vital.init(
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
      type: {
        type: DataTypes.STRING, // weight, temp, bpm, etc.
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      sequelize,
      modelName: "Vital",
    }
  );
  return Vital;
};
