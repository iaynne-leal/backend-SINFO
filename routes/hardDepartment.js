import { Router } from "express";
import { hardDepartmentGet, hardDepartmentPost } from "../controllers/hardDepartment.js"
const router = Router();

//rutas
router.get('/', hardDepartmentGet);

router.post('/', hardDepartmentPost);


export {router as routerHardDepartment};