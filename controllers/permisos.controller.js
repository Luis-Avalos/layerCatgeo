import pool from "../db.js";
import {sendAsignacionCapasEmail } from '../utils/emailSender.js'; 



/*** Obtener todos los permisos de un usuario (geouser)*/
export const getPermisosUsuario = async (req, res) => {
  const { usuarioId } = req.params;

  const result = await pool.query(`
    SELECT workspace, layer
    FROM "catalagoAPI".user_layers
    WHERE usuario_id = $1
    ORDER BY workspace, layer
  `, [usuarioId]);

  res.json(result.rows);
};

/*** Asignar workspace*/
export const addWorkspace = async (req, res) => {
    const usuarioId = req.user.id;
  const { workspace } = req.body;

  await pool.query(
    `
    INSERT INTO "catalagoAPI".user_workspaces (usuario_id, workspace)
    SELECT $1::integer, $2::varchar
    WHERE NOT EXISTS (
      SELECT 1
      FROM "catalagoAPI".user_workspaces
      WHERE usuario_id = $1::integer
        AND workspace = $2::varchar
    )
    `,
    [usuarioId, workspace]
  );

  res.json({ ok: true });
};

/*** Quitar workspace*/
export const removeWorkspace = async (req, res) => {
    const usuarioId = req.user.id;
  const { workspace } = req.body;

  await pool.query(`
    DELETE FROM "catalagoAPI".user_workspaces
WHERE usuario_id = $1 AND workspace = $2;
  `, [usuarioId, workspace]);

  // Limpia layers relacionadas
  await pool.query(`
 DELETE FROM "catalagoAPI".user_layers
WHERE usuario_id = $1 AND workspace = $2;
`, [usuarioId, workspace]);


  res.json({ ok: true });
};

/** Asignar layers*/

export const addLayers = async (req, res) => {
  const adminId = req.user.id;
  const { usuarioId, workspace, layers } = req.body;

  if (!usuarioId || !workspace || !layers?.length) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  if (usuarioId === adminId) {
    return res.status(400).json({
      error: "No puedes asignarte permisos a ti mismo"
    });
  }

  try {

    const layersInsertadas = [];

    for (const layer of layers) {
      const result = await pool.query(
        `
        INSERT INTO "catalagoAPI".user_layers
          (usuario_id, workspace, layer, asignado_por)
        SELECT
          $1::integer,
          $2::varchar,
          $3::varchar,
          $4::integer
        WHERE NOT EXISTS (
          SELECT 1
          FROM "catalagoAPI".user_layers
          WHERE usuario_id = $1
            AND workspace = $2
            AND layer = $3
        )
        RETURNING layer
        `,
        [usuarioId, workspace, layer, adminId]
      );

      if (result.rowCount > 0) {
        layersInsertadas.push(layer);
      }
    }

    // Si no hubo nuevas capas no mandar correo
    if (layersInsertadas.length === 0) {
      return res.json({
        ok: true,
        mensaje: "No se insertaron nuevas capas"
      });
    }

    // Obtener usuario
    const userResult = await pool.query(
      `SELECT nombre, apellido, email
       FROM "catalagoAPI".usuarios_cat
       WHERE id = $1`,
      [usuarioId]
    );

    const usuario = userResult.rows[0];

    // Obtener admin
    const adminResult = await pool.query(
      `SELECT nombre, apellido
       FROM "catalagoAPI".usuarios_cat
       WHERE id = $1`,
      [adminId]
    );

    const admin = adminResult.rows[0];

    if (usuario?.email) {

      const permisosAgrupados = {
        [workspace]: layersInsertadas
      };

      const fecha = new Date().toLocaleString("es-MX", {
        dateStyle: "full",
        timeStyle: "short"
      });

      await sendAsignacionCapasEmail({
        email: usuario.email,
        nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
        permisosAgrupados,
        asignadoPor: `${admin.nombre} ${admin.apellido}`,
        fechaAsignacion: fecha
      });
    }

    res.json({
      ok: true,
      capasAsignadas: layersInsertadas
    });

  } catch (error) {
    console.error("Error asignando layers:", error);
    res.status(500).json({ error: "Error asignando permisos" });
  }
};

/*Revocar layer a un usuario*/
export const removeLayer = async (req, res) => {
  const adminId = req.user.id;        
  const { usuarioId, workspace, layer } = req.body; 

  if (!usuarioId || !workspace || !layer) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  if (usuarioId === adminId) {
    return res.status(400).json({
      error: "No puedes revocarte permisos a ti mismo"
    });
  }

  try {
    const result = await pool.query(
      `
      DELETE FROM "catalagoAPI".user_layers
      WHERE usuario_id = $1
        AND workspace = $2
        AND layer = $3
      `,
      [usuarioId, workspace, layer]
    );

    res.json({
      ok: true,
      eliminado: result.rowCount === 1
    });
  } catch (error) {
    console.error("Error revocando layer:", error);
    res.status(500).json({ error: "Error al revocar permiso" });
  }
};