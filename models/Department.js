import { Model } from "sequelize";

export class Department extends Model {}

export default (db, DataTypes) => {
  Department.init(
    {
      pk_department: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      namedepartment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: db,
      modelName: "Department",
      tableName: "t_department",
      timestamps: true,
      paranoid: true,
    }
  );

  return Department;
};
