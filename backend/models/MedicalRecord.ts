import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class MedicalRecord extends Model {
    static associate(models: any) {
      if (models.Pet) MedicalRecord.belongsTo(models.Pet, { foreignKey: 'petId', as: 'pet' });
    }
  }
  
  MedicalRecord.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      documentUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "MedicalRecord",
    }
  );
  return MedicalRecord;
};
