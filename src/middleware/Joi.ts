import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IOrganizacion } from '../models/Organizacion';
import { IUsuario } from '../models/Usuario';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    organizacion: {
        create: Joi.object<IOrganizacion>({
            name: Joi.string().required(),
            usuarios: Joi.array()
                .items(
                    Joi.string().regex(/^[0-9a-fA-F]{24}$/)
                )
                .optional()
        }),
        update: Joi.object<IOrganizacion>({
            name: Joi.string().required(),
            usuarios: Joi.array()
                .items(
                    Joi.string().regex(/^[0-9a-fA-F]{24}$/)
                )
                .optional()
        })
    },
    usuario: {
        create: Joi.object<IUsuario>({
            organizacion: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }),
        update: Joi.object({
            organizacion: Joi.string()
<<<<<<< HEAD
                .pattern(/^[0-9a-fA-F]{24}$/)
                .optional(),
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(6).optional(),
            rol: Joi.string().valid('admin', 'user').optional()
        }).min(1)
=======
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).optional()
        })
>>>>>>> 636da8ea1478a3b6aca81a6d88b298fa026a2ff8
    }
};