import express from "express";
import cors from "cors";
import geoserverRoutes from "./routes/geoserver.routes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/geoserver", geoserverRoutes);

export default app;
