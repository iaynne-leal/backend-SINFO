import { Router } from "express";
import { softAgencyGet, softAgencyPost } from "../controllers/softAgency.js"
const router = Router();

//rutas
router.get('/', softAgencyGet);

router.post('/', softAgencyPost);


export {router as routerSoftAgency};