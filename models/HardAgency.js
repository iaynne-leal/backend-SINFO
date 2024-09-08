import { Model } from "sequelize";

export class HardAgency extends Model {}

export default (db, DataTypes) => {
  HardAgency.init(
    {
      pk_hardagency: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      pk_postagency: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      pk_hardware: {
        type: DataTypes.INTEGER,
        allowNull: true, 
      },
    },
    {
      sequelize: db,
      modelName: "HardAgency", 
      tableName: "t_hardagency",
      timestamps: true,
      paranoid: true,
    }
  );

  return HardAgency;
};