import express from "express";
import {
  getPermisosUsuario,
  addWorkspace,
  removeWorkspace,
  addLayers,
  removeLayer
} from "../controllers/permisos.controller.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const router = express.Router();
    
// Solo admins
router.use(jwtAuth);

router.get("/usuario/:usuarioId", getPermisosUsuario);

router.post("/workspace", addWorkspace);
router.delete("/workspace", removeWorkspace);

router.post("/layers", addLayers);
router.post("/layers/remove", removeLayer);


export default router;
