import { Model } from "sequelize";

export class SoftAgency extends Model {}

export default (db, DataTypes) => {
  SoftAgency.init(
    {
      pk_softagency: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      pk_postagency: {
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
      modelName: "SoftAgency",
      tableName: "t_softagency",
      timestamps: true,
      paranoid: true,
    }
  );

  return SoftAgency;
};
