import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar usuario por email
      const user = await prisma.usuarios_cat.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(400).json({ error: "Credenciales inválidas" });
      }

      // Comparar contraseñas
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(400).json({ error: "Credenciales inválidas" });
      }

      // Crear token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      // Respuesta
      res.json({
        token,
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
        foto_perfil_url: user.foto_perfil_url,
        fecha_registro: user.fecha_registro
      });

    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

export default authController;
