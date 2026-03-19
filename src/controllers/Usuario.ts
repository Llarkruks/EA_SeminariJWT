import { NextFunction, Request, Response } from 'express';
import UsuarioService from '../services/Usuario';
import { AuthRequest } from '../middleware/auth';

const createUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
<<<<<<< HEAD
        const payload = {
            ...req.body,
            rol: 'user'
        };

        const savedUsuario = await UsuarioService.createUsuario(payload);
=======
        const savedUsuario = await UsuarioService.createUsuario(req.body);
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8
        return res.status(201).json(savedUsuario);
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'El email ya está registrado' });
        }
        return res.status(500).json({ error });
    }
};

const readUsuario = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const usuarioId = req.params.usuarioId;

    try {
        const usuario = await UsuarioService.getUsuario(usuarioId);
        return usuario ? res.status(200).json(usuario) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await UsuarioService.getAllUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateUsuario = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const usuarioId = req.params.usuarioId;

    try {
<<<<<<< HEAD
        const updateData: any = { ...req.body };

        if (req.user?.rol !== 'admin') {
            delete updateData.rol;
            delete updateData.organizacion;
        }

        const updatedUsuario = await UsuarioService.updateUsuario(usuarioId, updateData);
        return updatedUsuario ? res.status(201).json(updatedUsuario) : res.status(404).json({ message: 'not found' });
=======
        const updatedUsuario = await UsuarioService.updateUsuario(usuarioId, req.body);
        return updatedUsuario ? res.status(200).json(updatedUsuario) : res.status(404).json({ message: 'not found' });
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8
    } catch (error) {
        return res.status(500).json({ error });
    }
};

<<<<<<< HEAD
const deleteUsuario = async (req: AuthRequest, res: Response, next: NextFunction) => {
=======
const deleteUsuario = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8
    const usuarioId = req.params.usuarioId;

    try {
        const usuario = await UsuarioService.deleteUsuario(usuarioId);
        return usuario ? res.status(200).json(usuario) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

<<<<<<< HEAD
export default { createUsuario, readUsuario, readAll, updateUsuario, deleteUsuario };
=======
export default {
    createUsuario,
    readUsuario,
    readAll,
    updateUsuario,
    deleteUsuario
};
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8
