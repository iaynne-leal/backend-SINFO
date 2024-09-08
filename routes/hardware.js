import { Router } from "express";
import { hardwareGet, hardwarePost } from "../controllers/hardware.js"
const router = Router();

//rutas
router.get('/', hardwareGet);

router.post('/', hardwarePost);


export {router as routerHardware};