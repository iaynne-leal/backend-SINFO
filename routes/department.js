import { Router } from "express";
import { departmentGet, departmentPost } from "../controllers/department.js"
const router = Router();

//rutas
router.get('/', departmentGet);

router.post('/', departmentPost);


export {router as routerDepartment};