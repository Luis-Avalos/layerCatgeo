import { Router } from "express";
import {
  getStations,
  getCurrentByStation,
} from "../controllers/weather.controller.js";

const router = Router();

router.get("/stations", getStations);
router.get("/current/:stationId", getCurrentByStation);

export default router;