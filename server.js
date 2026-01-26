import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";

const PORT = 443;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get('/', (req, res) => {
  res.json({
    ok: true,
    servicio: 'API Catálogo',
    status: 'online'
  })
})
