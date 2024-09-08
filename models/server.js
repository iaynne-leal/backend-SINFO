import express from "express";
import cors from "cors";
import { db } from "../database/connection.js";
import fileUpload from "express-fileupload";
import { routerAgency } from "../routes/agency.js";
import { routerDepartment } from "../routes/department.js";
import { routerHardware } from "../routes/hardware.js";
import { routerSoftware } from "../routes/software.js";
import { routerPostAgency } from "../routes/postAgency.js";
import { routerPostDepartment } from "../routes/postDepartment.js";
import { routerSoftAgency } from "../routes/softAgency.js";
import { routerHardAgency } from "../routes/hardAgency.js";
import { routerSoftDepartment } from "../routes/softDepartment.js";
import { routerHardDepartment } from "../routes/hardDepartment.js";


const whiteList = ['http://localhost:3000' ]; // Añade aquí el dominio de tu aplicación cliente
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.agencyPath = '/api/agency';
        this.departmentPath = '/api/department';
        this.hardwarePath = '/api/hardware';
        this.softwarePath = '/api/software';
        this.postagencyPath = '/api/postAgency';
        this.postdepartmentPath = '/api/postDepartment';
        this.softAgencyPath = '/api/softAgency';
        this.hardAgencyPath = '/api/hardAgency';
        this.softDepartmentPath = '/api/softDepartment';
        this.hardDepartmentPath = '/api/hardDepartment';
      
      
      
     
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors(corsOptions));
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'));
        // Subida de archivos al servidor
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('DB online');
        } catch (error) {
            throw new Error(error);
        }
    }

    routes() {
        this.app.use(this.agencyPath, routerAgency);
        this.app.use(this.departmentPath, routerDepartment);
        this.app.use(this.hardwarePath, routerHardware);
        this.app.use(this.softwarePath, routerSoftware);
        this.app.use(this.postagencyPath, routerPostAgency);
        this.app.use(this.postdepartmentPath, routerPostDepartment);
        this.app.use(this.softAgencyPath, routerSoftAgency);
        this.app.use(this.hardAgencyPath, routerHardAgency);
        this.app.use(this.softDepartmentPath, routerSoftDepartment);
        this.app.use(this.hardDepartmentPath, routerHardDepartment);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`);
        });
    }
}

export { Server };