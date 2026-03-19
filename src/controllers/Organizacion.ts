import { NextFunction, Request, Response } from 'express';
import OrganizacionService from '../services/Organizacion';

const createOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedOrganizacion = await OrganizacionService.createOrganizacion(req.body);
        return res.status(201).json(savedOrganizacion);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizacion = await OrganizacionService.getOrganizacion(req.params.organizacionId);
        return organizacion
            ? res.status(200).json(organizacion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizaciones = await OrganizacionService.getAllOrganizaciones();
        return res.status(200).json(organizaciones);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    const organizacionId = req.params.organizacionId;

    try {
        const organizacion = await OrganizacionService.updateOrganizacion(organizacionId, req.body);
        return organizacion
            ? res.status(200).json(organizacion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    const organizacionId = req.params.organizacionId;

    try {
        const organizacion = await OrganizacionService.deleteOrganizacion(organizacionId);
        return organizacion
            ? res.status(200).json(organizacion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

<<<<<<< HEAD
export default { createOrganizacion, readOrganizacion, readAll, updateOrganizacion, deleteOrganizacion };
=======
const readUsuariosByOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    const organizacionId = req.params.organizacionId;

    try {
        const organizacion = await OrganizacionService.getUsuariosByOrganizacion(organizacionId);

        if (!organizacion) {
            return res.status(404).json({ message: 'not found' });
        }

        return res.status(200).json(organizacion.usuarios);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default {
    createOrganizacion,
    readOrganizacion,
    readAll,
    updateOrganizacion,
    deleteOrganizacion,
    readUsuariosByOrganizacion
};
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8
