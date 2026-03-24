import { Router } from 'express';
import {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  uploadFotoPerfilUsuario,
  deleteCiudadano
} from '../controllers/usuariosCat.js';

const router = Router();

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.post('/:id/foto', uploadFotoPerfilUsuario);
router.delete('/:id', deleteCiudadano);

export default router;
