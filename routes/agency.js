import { Router } from "express";
import { agencyGet, agencyPost } from "../controllers/agency.js"
const router = Router();

//rutas
router.get('/', agencyGet);

router.post('/', agencyPost);


export {router as routerAgency};