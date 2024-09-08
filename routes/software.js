import { Router } from "express";
import { softwareGet, softwarePost } from "../controllers/software.js"
const router = Router();

//rutas
router.get('/', softwareGet);

router.post('/', softwarePost);


export {router as routerSoftware};