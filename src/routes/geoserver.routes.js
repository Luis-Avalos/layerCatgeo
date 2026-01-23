// file: routes/geoserverRoutes.js
import express from "express";
import { 
  getWFS, 
  getWMS, 
  listLayers, 
  listWorkspaces,
  listAllLayers 
} from "../controllers/geoserver.controller.js";

const router = express.Router();

// Rutas para workspaces
router.get("/workspaces", listWorkspaces);
router.get("/layers/all", listAllLayers);

// Rutas que necesitan workspace
router.get("/layers/:workspace", listLayers); 
router.get("/wfs/:workspace/:layer", getWFS); 
router.get("/wms/:workspace/:layer", getWMS); 

router.get("/layers", (req, res, next) => {
  const defaultWorkspace = process.env.GEOSERVER_WORKSPACE || 'geomatica';
  res.redirect(`/api/geoserver/layers/${defaultWorkspace}`);
});

router.get("/wfs/:layer", (req, res, next) => {
  const defaultWorkspace = process.env.GEOSERVER_WORKSPACE || 'geomatica';
  res.redirect(`/api/geoserver/wfs/${defaultWorkspace}/${req.params.layer}`);
});

router.get("/wms/:layer", (req, res, next) => {
  const defaultWorkspace = process.env.GEOSERVER_WORKSPACE || 'geomatica';
  res.redirect(`/api/geoserver/wms/${defaultWorkspace}/${req.params.layer}`);
});

export default router;