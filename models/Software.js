import { Model } from "sequelize";

export class Software extends Model {}

export default (db, DataTypes) => {
  Software.init(
    {
      pk_software: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      namesoftware: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: db,
      modelName: "Software",
      tableName: "t_software",
      timestamps: true,
      paranoid: true,
    }
  );

  return Software;
};
