import { Router } from "express";
import { hardAgencyGet, hardAgencyPost } from "../controllers/hardAgency.js"
const router = Router();

//rutas
router.get('/', hardAgencyGet);

router.post('/', hardAgencyPost);


export {router as routerHardAgency};