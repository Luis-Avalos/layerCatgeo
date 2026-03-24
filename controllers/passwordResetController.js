import prisma from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendResetCode } from "../utils/emailSender.js";

function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

const passwordResetController = {
  // Solicitar recuperación
  requestReset: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await prisma.usuarios_cat.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const codigo = generateCode();
      const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 min

      await prisma.password_resets_cat.create({
        data: {
          email,
          codigo,
          expires_at: expires
        }
      });

      await sendResetCode(email, codigo);

      res.json({ message: "Código enviado al email" });
    } catch (error) {
      console.error("Error en requestReset:", error);
      res.status(500).json({ error: "Error al solicitar recuperación" });
    }
  },

  // Verificar código
  verifyCode: async (req, res) => {
    try {
      const { email, codigo } = req.body;

      const record = await prisma.password_resets_cat.findFirst({
        where: {
          email,
          codigo,
          used: false,
          expires_at: { gt: new Date() }
        }
      });

      if (!record) {
        return res.status(400).json({ error: "Código inválido o expirado" });
      }

      res.json({ message: "Código válido" });
    } catch (error) {
      console.error("Error en verifyCode:", error);
      res.status(500).json({ error: "Error al verificar código" });
    }
  },

  // Cambiar contraseña
  resetPassword: async (req, res) => {
    try {
      const { email, codigo, nuevaPassword } = req.body;

      const record = await prisma.password_resets_cat.findFirst({
        where: {
          email,
          codigo,
          used: false,
          expires_at: { gt: new Date() }
        }
      });

      if (!record) {
        return res.status(400).json({ error: "Código inválido o expirado" });
      }

      const hashed = await bcrypt.hash(nuevaPassword, 10);

      // Actualizar usuario
      const ciudadano = await prisma.usuarios_cat.findUnique({
        where: { email }
      });

      if (!ciudadano) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      await prisma.usuarios_cat.update({
        where: { email },
        data: { password_hash: hashed }
      });

      // Marcar código como usado
      await prisma.password_resets_cat.update({
        where: { id: record.id },
        data: { used: true }
      });

      res.json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
      console.error("Error en resetPassword:", error);
      res.status(500).json({ error: "Error al cambiar contraseña" });
    }
  }
};

export default passwordResetController;
