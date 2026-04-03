import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Appointment extends Model {
    static associate(models: any) {
      if (models.User) {
        Appointment.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
        Appointment.belongsTo(models.User, { foreignKey: 'vetId', as: 'veterinarian' });
      }
      if (models.Pet) {
        Appointment.belongsTo(models.Pet, { foreignKey: 'petId', as: 'pet' });
      }
    }
  }

  Appointment.init(
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
      vetId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      petId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING, // pending | confirmed | cancelled | completed
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
