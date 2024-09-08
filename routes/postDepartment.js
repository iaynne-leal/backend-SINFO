import { Router } from "express";
import { postDepartmentGet, postDepartmentPost } from "../controllers/postDepartment.js"
const router = Router();

//rutas
router.get('/', postDepartmentGet);

router.post('/', postDepartmentPost);


export {router as routerPostDepartment};