import { Model } from "sequelize";

export class HardDepartment extends Model {}

export default (db, DataTypes) => {
  HardDepartment.init(
    {
      pk_harddepartment: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      pk_postdepartment: {
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
      modelName: "HardDepartment", 
      tableName: "t_harddepartment",
      timestamps: true,
      paranoid: true,
    }
  );

  return HardDepartment;
};