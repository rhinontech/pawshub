import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Pet extends Model {
    static associate(models: any) {
      if (models.User) Pet.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
      if (models.Appointment) Pet.hasMany(models.Appointment, { foreignKey: 'petId', as: 'appointments' });
      if (models.Vital) Pet.hasMany(models.Vital, { foreignKey: 'petId', as: 'vitals' });
      if (models.Vaccine) Pet.hasMany(models.Vaccine, { foreignKey: 'petId', as: 'vaccines' });
      if (models.Medication) Pet.hasMany(models.Medication, { foreignKey: 'petId', as: 'medications' });
      if (models.MedicalRecord) Pet.hasMany(models.MedicalRecord, { foreignKey: 'petId', as: 'medicalRecords' });
      if (models.Reminder) Pet.hasMany(models.Reminder, { foreignKey: 'petId', as: 'reminders' });
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
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      microchip_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
