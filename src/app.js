import express from "express";
import cors from "cors";

import geoserverRoutes from "../routes/geoserver.routes.js";
import authRoutes from "../routes/authRoutes.js";
import passwordResetRoutes from "../routes/passwordResetRoutes.js";
import usuariosCatRoutes from "../routes/usuariosRoutes.js";
import permisosRoutes from "../routes/permisos.routes.js";

import { jwtAuth } from "../middlewares/jwtAuth.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

/*  RUTAS PUBLICAS*/
app.use("/api/auth", authRoutes);
app.use("/api/auth", passwordResetRoutes);

/* GEOSERVER SIN JWT */
app.use("/api/geoserver", geoserverRoutes);

/* MIDDLEWARE JWT SOLO PARA LO DMAS */
app.use("/api", jwtAuth);

/* RUTAS PROTEGIDAS */
app.use("/api/usuarios", usuariosCatRoutes);
app.use("/api/permisos", permisosRoutes);

app.get("/", (req, res) => {
  res.json({
    ok: true,
    servicio: "API Catálogo",
    status: "online",
  });
});

export default app;