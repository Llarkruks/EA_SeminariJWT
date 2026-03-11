import mongoose from 'mongoose';
import Usuario, { IUsuarioModel, IUsuario } from '../models/Usuario';
import Organizacion from '../models/Organizacion';

const createUsuario = async (data: Partial<IUsuario>): Promise<IUsuarioModel> => {
    const usuario = new Usuario({
        _id: new mongoose.Types.ObjectId(),
        ...data
    });

    const savedUsuario = await usuario.save();

    await Organizacion.findByIdAndUpdate(savedUsuario.organizacion, {
        $addToSet: { usuarios: savedUsuario._id }
    });

    return savedUsuario;
};

const getUsuario = async (usuarioId: string): Promise<IUsuarioModel | null> => {
    return await Usuario.findById(usuarioId).populate('organizacion');
};

const getAllUsuarios = async (): Promise<IUsuarioModel[]> => {
    return await Usuario.find().populate('organizacion');
};

const updateUsuario = async (usuarioId: string, data: Partial<IUsuario>): Promise<IUsuarioModel | null> => {
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
        return null;
    }

    const organizacionAnterior = usuario.organizacion?.toString();

    usuario.set(data);
    const updatedUsuario = await usuario.save();

    const nuevaOrganizacion = updatedUsuario.organizacion?.toString();

    if (data.organizacion && organizacionAnterior !== nuevaOrganizacion) {
        await Organizacion.findByIdAndUpdate(organizacionAnterior, {
            $pull: { usuarios: updatedUsuario._id }
        });

        await Organizacion.findByIdAndUpdate(nuevaOrganizacion, {
            $addToSet: { usuarios: updatedUsuario._id }
        });
    }

    return updatedUsuario;
};

const deleteUsuario = async (usuarioId: string): Promise<IUsuarioModel | null> => {
    const usuario = await Usuario.findByIdAndDelete(usuarioId);

    if (usuario) {
        await Organizacion.findByIdAndUpdate(usuario.organizacion, {
            $pull: { usuarios: usuario._id }
        });
    }

    return usuario;
};

export default {
    createUsuario,
    getUsuario,
    getAllUsuarios,
    updateUsuario,
    deleteUsuario
};