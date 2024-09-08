import { Model } from "sequelize";

export class PostDepartment extends Model {}

export default (db, DataTypes) => {
  PostDepartment.init(
    {
      pk_postdepartment: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      namepostdepartment: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      pk_department: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize: db,
      modelName: "PostDepartment",
      tableName: "t_postdepartment",
      timestamps: true,
      paranoid: true,
    }
  );

  return PostDepartment;
};
