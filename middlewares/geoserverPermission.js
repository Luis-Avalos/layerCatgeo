import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkLayerPermission = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const { workspace, layer } = req.params;
    const usuarioId = req.user.id;

    const permiso = await prisma.user_layers.findFirst({
      where: {
        usuario_id: usuarioId,
        workspace,
        layer
      },
      select: { id: true }
    });

    if (!permiso) {
      return res.status(403).json({
        error: "No tienes permiso para esta capa"
      });
    }

    next();
  } catch (error) {
    console.error("Error validando permisos GeoServer:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
