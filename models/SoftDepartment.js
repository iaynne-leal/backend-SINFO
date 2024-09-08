import { Model } from "sequelize";

export class SoftDepartment extends Model {}

export default (db, DataTypes) => {
  SoftDepartment.init(
    {
      pk_softdepartment: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      pk_postdepartment: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      pk_software: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      key: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: db,
      modelName: "SoftDepartment",
      tableName: "t_softdepartment",
      timestamps: true,
      paranoid: true,
    }
  );

  return SoftDepartment;
};
