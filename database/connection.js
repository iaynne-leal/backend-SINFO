import { DataTypes, Sequelize } from "sequelize";
import "dotenv/config";
import { initAgency} from "../models/index.js";
import { initDepartment} from "../models/index.js";
import { initHardware} from "../models/index.js";
import { initSoftware} from "../models/index.js";
import { initPostAgency} from "../models/index.js";
import { initPostDepartment} from "../models/index.js";
import { initSoftAgency} from "../models/index.js";
import { initHardAgency} from "../models/index.js";
import { initSoftDepartment} from "../models/index.js";
import { initHardDepartment} from "../models/index.js";





// Creación de una nueva instancia de Sequelize para la conexión a la base de datos
const db = new Sequelize(process.env.BD, process.env.USER, process.env.PASS, {
  host: process.env.HOST,
  dialect: "mysql",
   port: process.env.PORTA,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // }
  // logging: false;
});

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Inicialización de los modelos de la base de datos

const Agency = initAgency(db,DataTypes)
const Department = initDepartment(db,DataTypes)
const Hardware = initHardware(db,DataTypes)
const Software = initSoftware(db,DataTypes)
const PostAgency = initPostAgency(db,DataTypes)
const PostDepartment = initPostDepartment(db,DataTypes)
const SoftAgency = initSoftAgency(db,DataTypes)
const HardAgency = initHardAgency(db,DataTypes)
const SoftDepartment = initSoftDepartment(db,DataTypes)
const HardDepartment = initHardDepartment(db,DataTypes)


//llave primaria de agencia a llave foranea de puesto de agencia 
PostAgency.belongsTo(Agency, { foreignKey: "pk_agency" }); // un puesto de agencia puede tener una agencia
Agency.hasMany(PostAgency, { foreignKey: "pk_agency" }); // una agencia puede tener varios puesto de agencia

//llave primaria de departamento a llave foranea de puesto de departamento
PostDepartment.belongsTo(Department, { foreignKey: "pk_department" }); // un puesto de departamento puede tener un departamento
Department.hasMany(PostDepartment, { foreignKey: "pk_department" }); // un departamento puede tener varios puesto 

//llave primaria de puesto de agencia a llave foranea de softwareAgencia
SoftAgency.hasMany(PostAgency, { foreignKey: "pk_postagency" }); // un puesto de agencia puede tener un software de agencia
PostAgency.hasMany(SoftAgency, { foreignKey: "pk_postagency" }); // un software de agencia puede tener varios puestos de agencia 

//llave primaria de software a llave foranea de softwareAgencia
SoftAgency.hasMany(Software, { foreignKey: "pk_software" }); // un software  puede tener un puesto de agencia
Software.hasMany(SoftAgency, { foreignKey: "pk_sotware" }); // un puesto de agencia puede tener varios software

//llave primaria de puesto de agencia a llave foranea de HardAgencia
HardAgency.hasMany(PostAgency, { foreignKey: "pk_postagency" }); // un puesto de agencia puede tener un software de agencia
PostAgency.hasMany(HardAgency, { foreignKey: "pk_postagency" }); // un software de agencia puede tener varios puestos de agencia 

//llave primaria de hardware a llave foranea de softwareAgencia
HardAgency.hasMany(Hardware, { foreignKey: "pk_hardware" }); // un hardware  puede tener un puesto de agencia
Hardware.belongsTo(HardAgency, { foreignKey: "pk_hardware" }); // un puesto de agencia puede tener un hardware

//llave primaria de puesto de departamento a llave foranea de softwareDepartment
SoftDepartment.hasMany(PostDepartment, { foreignKey: "pk_postdepartment" }); // un puesto de agencia puede tener un software de agencia
PostDepartment.hasMany(SoftDepartment, { foreignKey: "pk_postdepartment" }); // un software de agencia puede tener varios puestos de agencia 

//llave primaria de software a llave foranea de softwareAgencia
SoftDepartment.hasMany(Software, { foreignKey: "pk_software" }); // un software  puede tener un puesto de agencia
Software.hasMany(SoftDepartment, { foreignKey: "pk_sotware" }); // un puesto de agencia puede tener varios software

//llave primaria de puesto de departamento a llave foranea de HardDepartamento
HardDepartment.hasMany(PostDepartment, { foreignKey: "pk_postdepartment" }); // un puesto de agencia puede tener un software de agencia
PostDepartment.hasMany(HardDepartment, { foreignKey: "pk_postdepartment" }); // un software de agencia puede tener varios puestos de agencia 

//llave primaria de hardware a llave foranea de softwareAgencia
HardDepartment.hasMany(Hardware, { foreignKey: "pk_hardware" }); // un hardware  puede tener un puesto de agencia
Hardware.belongsTo(HardDepartment, { foreignKey: "pk_hardware" }); // un puesto de agencia puede tener un hardware



export { db };
