import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({
    ok: true,
    servicio: 'API Catálogo',
    status: 'online'    
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
