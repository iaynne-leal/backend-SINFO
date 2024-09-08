import { Router } from "express";
import { softDepartmentGet, softDepartmentPost } from "../controllers/softDepartment.js"
const router = Router();

//rutas
router.get('/', softDepartmentGet);

router.post('/', softDepartmentPost);


export {router as routerSoftDepartment};