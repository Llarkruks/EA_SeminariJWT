<<<<<<< HEAD
import Usuario, { IUsuario } from '../models/Usuario';

const createUsuario = async (data: IUsuario) => {
    const usuario = new Usuario(data);
    return await usuario.save();
=======
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
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8
};

const getUsuario = async (id: string) => {
    return await Usuario.findById(id).populate('organizacion');
};

const getAllUsuarios = async () => {
    return await Usuario.find().populate('organizacion');
};

<<<<<<< HEAD
const updateUsuario = async (id: string, data: Partial<IUsuario>) => {
    const usuario = await Usuario.findById(id);
=======
const updateUsuario = async (usuarioId: string, data: Partial<IUsuario>): Promise<IUsuarioModel | null> => {
    const usuario = await Usuario.findById(usuarioId);
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8

    if (!usuario) {
        return null;
    }

<<<<<<< HEAD
    if (data.name !== undefined) {
        usuario.name = data.name;
    }

    if (data.email !== undefined) {
        usuario.email = data.email;
    }

    if (data.password !== undefined) {
        usuario.password = data.password;
    }

    if (data.organizacion !== undefined) {
        usuario.organizacion = data.organizacion;
    }

    if (data.rol !== undefined) {
        usuario.rol = data.rol;
    }

    return await usuario.save();
};

const deleteUsuario = async (id: string) => {
    return await Usuario.findByIdAndDelete(id);
=======
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
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8
};

export default {
    createUsuario,
    getUsuario,
    getAllUsuarios,
    updateUsuario,
    deleteUsuario
};