import { Model } from "sequelize";

export class Hardware extends Model {}

export default (db, DataTypes) => {
  Hardware.init( {
	
    pk_hardware: {
		type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

	accounting_code: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    brand: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    desk_laptop: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    storage: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    motherboard: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    proccesor: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    frequency: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    nuclei: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    threads: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    architecture: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    gpu: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    ram: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    HDD: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    SSD: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},
{
    sequelize:db, 
    modelName: 'Hardware',
    tableName: "t_hardware",
    timestamps: true,
    paranoid: true
  })

  return Hardware;
};


