import Usuario, { IUsuario } from '../models/Usuario';

const createUsuario = async (data: IUsuario) => {
    const usuario = new Usuario(data);
    return await usuario.save();
};

const getUsuario = async (id: string) => {
    return await Usuario.findById(id).populate('organizacion');
};

const getAllUsuarios = async () => {
    return await Usuario.find().populate('organizacion');
};

const updateUsuario = async (id: string, data: Partial<IUsuario>) => {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        return null;
    }

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
};

export default {
    createUsuario,
    getUsuario,
    getAllUsuarios,
    updateUsuario,
    deleteUsuario
};