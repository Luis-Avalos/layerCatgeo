import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const jwtAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.usuarios_cat.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        rol: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Usuario no válido" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
