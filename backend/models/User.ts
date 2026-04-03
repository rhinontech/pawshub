import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class User extends Model {
    static associate(models: any) {
      if (models.Pet) User.hasMany(models.Pet, { foreignKey: 'ownerId', as: 'pets' });
      if (models.Post) User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
      if (models.Reminder) User.hasMany(models.Reminder, { foreignKey: 'userId', as: 'reminders' });
      if (models.Appointment) {
        User.hasMany(models.Appointment, { foreignKey: 'ownerId', as: 'ownerAppointments' });
        User.hasMany(models.Appointment, { foreignKey: 'vetId', as: 'vetAppointments' });
      }
    }
  }
  
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('owner', 'veterinarian', 'admin', 'shelter'),
        defaultValue: 'owner',
      },
      isVerified: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      clinic_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      license_number: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
