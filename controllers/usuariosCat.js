process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import prisma from '../models/userModel.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import AWS from 'aws-sdk';
import { sendRegistroCiudadanoEmail } from '../utils/emailSender.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// S3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: new AWS.Endpoint(process.env.AWS_URL),
  s3ForcePathStyle: true,
});

async function subirAS3(file, email) {
  const key = `${process.env.AWS_FOLDER}/usuarios/${email}/${file.originalname}`;
  await s3.upload({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  }).promise();

  return `${process.env.AWS_URL}/${process.env.AWS_BUCKET}/${key}`;
}

// ================= CONTROLLERS =================

export const getAllUsuarios = async (req, res) => {
  const usuarios = await prisma.usuarios_cat.findMany();
  res.json(usuarios);
};

export const getUsuarioById = async (req, res) => {
  const usuario = await prisma.usuarios_cat.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

export const createUsuario = [
  upload.single("foto"),
  async (req, res) => {
    try {
      const { nombre, apellido, email, password, rol, noempleado } = req.body;

      if (!password || password.trim() === "") {
        return res.status(400).json({
          error: "La contraseña es obligatoria",
        });
      }

      const exists = await prisma.usuarios_cat.findUnique({
        where: { email },
      });

      if (exists) {
        return res.status(400).json({
          error: "Correo ya registrado",
        });
      }

      const hashed = await bcrypt.hash(password, 10);
      let fotoUrl = null;

      if (req.file) {
        fotoUrl = await subirAS3(req.file, email);
      }

      const nuevo = await prisma.usuarios_cat.create({
        data: {
          nombre,
          apellido,
          email,
          password_hash: hashed,
          rol,
          foto_perfil_url: fotoUrl,
          noempleado,
        },
      });

      // Enviar correo
      try {
        await sendRegistroCiudadanoEmail({
          nombre,
          apellido,
          email,
        });
      } catch (emailError) {
        console.error("Error enviando correo:", emailError);
    
      }

      return res.status(201).json({
        message: "Usuario creado correctamente",
        usuario: nuevo,
      });

    } catch (error) {
      console.error("Error createUsuario:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  },
];


export const updateUsuario = [
  upload.single('foto'),
  async (req, res) => {
    const id = Number(req.params.id);

    const {
      nombre,
      apellido,
      email,
      password,
      noempleado
    } = req.body;

    const data = {};

    if (nombre) data.nombre = nombre;
    if (apellido) data.apellido = apellido;
    if (email) data.email = email;
    if (noempleado) data.noempleado = noempleado;

    if (password) {
      data.password_hash = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      const fotoUrl = await subirAS3(req.file, id);
      data.foto_perfil_url = fotoUrl;
    }

    const actualizado = await prisma.usuarios_cat.update({
      where: { id },
      data,
    });

    res.json(actualizado);
  },
];


export const uploadFotoPerfilUsuario = [
  upload.single('foto'),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No image' });

    const fotoUrl = await subirAS3(req.file, req.params.id);

    const usuario = await prisma.usuarios_cat.update({
      where: { id: Number(req.params.id) },
      data: { foto_perfil_url: fotoUrl },
    });

    res.json(usuario);
  },
];


export const deleteCiudadano = async (req, res) => {
  await prisma.usuarios_cat.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ ok: true });
};
