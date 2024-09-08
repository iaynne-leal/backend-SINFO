import { Model } from "sequelize";

export class PostAgency extends Model {}

export default (db, DataTypes) => {
  PostAgency.init(
    {
      pk_postagency: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      namepostagency: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      pk_agency: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize: db,
      modelName: "PostAgency",
      tableName: "t_postagency",
      timestamps: true,
      paranoid: true,
    }
  );

  return PostAgency;
};
