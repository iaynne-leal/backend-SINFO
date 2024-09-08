import { Model } from "sequelize";

export class Agency extends Model {}

export default (db, DataTypes) => {
  Agency.init(
    {
      pk_agency: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      nameagency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: db,
      modelName: "Agency",
      tableName: "t_agency",
      timestamps: true,
      paranoid: true,
    }
  );

  return Agency;
};
