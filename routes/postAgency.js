import { Router } from "express";
import { postAgencyGet, postAgencyPost } from "../controllers/postAgency.js"
const router = Router();

//rutas
router.get('/', postAgencyGet);

router.post('/', postAgencyPost);


export {router as routerPostAgency};