import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Reminder extends Model {
    static associate(models: any) {
      if (models.User) Reminder.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
      if (models.Pet) Reminder.belongsTo(models.Pet, { foreignKey: 'petId', as: 'pet' });
    }
  }

  Reminder.init(
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
      petId: {
        type: DataTypes.UUID,
        allowNull: true, // Some reminders may be user-level, not pet-specific
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      time: {
        type: DataTypes.STRING, // e.g. "08:00 AM"
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true, // null = recurs based on recurrence field
      },
      recurrence: {
        type: DataTypes.STRING, // none | daily | weekly | monthly
        defaultValue: 'none',
      },
      type: {
        type: DataTypes.STRING, // med | food | vaccine | appointment | general
        defaultValue: 'general',
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Reminder",
    }
  );
  return Reminder;
};
