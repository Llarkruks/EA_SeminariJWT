import express from 'express';
import controller from '../controllers/Organizacion';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Organizaciones
 *     description: Endpoints CRUD de organizaciones
 *
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ObjectId de MongoDB
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           example: "juan@email.com"
 *         password:
 *           type: string
 *           example: "123456"
 *         organizacion:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789013"
 *     Organizacion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ObjectId de MongoDB
 *           example: "65f1c2a1b2c3d4e5f6789013"
 *         name:
 *           type: string
 *           example: "EA Company"
 *         usuarios:
 *           type: array
 *           items:
 *             type: string
 *           description: Array de ObjectIds de usuarios
 *           example: ["65f1c2a1b2c3d4e5f6789012"]
 *     OrganizacionCreateUpdate:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "EA Company"
 *         usuarios:
 *           type: array
 *           items:
 *             type: string
 *           example: ["65f1c2a1b2c3d4e5f6789012"]
 */

/**
 * @openapi
 * /organizaciones:
 *   post:
 *     summary: Crea una organización (solo admin)
 *     tags: [Organizaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizacionCreateUpdate'
 *     responses:
 *       201:
 *         description: Creado
 *       403:
 *         description: Solo administradores
 *       422:
 *         description: Validación fallida (Joi)
 */
router.post(
    '/',
    authenticateToken,
    authorizeRoles('admin'),
    ValidateJoi(Schemas.organizacion.create),
    controller.createOrganizacion
);

/**
 * @openapi
 * /organizaciones/{organizacionId}/usuarios:
 *   get:
 *     summary: Obtiene los usuarios de una organización
 *     tags: [Organizaciones]
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId de la organización
 *     responses:
 *       200:
 *         description: Lista de usuarios de la organización
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: No encontrado
 */
router.get('/:organizacionId/usuarios', controller.readUsuariosByOrganizacion);

/**
 * @openapi
 * /organizaciones/{organizacionId}:
 *   get:
 *     summary: Obtiene una organización por ID
 *     tags: [Organizaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId de la organización
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizacion'
 *       404:
 *         description: No encontrado
 */
router.get('/:organizacionId', authenticateToken, controller.readOrganizacion);

/**
 * @openapi
 * /organizaciones:
 *   get:
 *     summary: Lista organizaciones
 *     tags: [Organizaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organizacion'
 */
router.get('/', authenticateToken, controller.readAll);

/**
 * @openapi
 * /organizaciones/{organizacionId}:
 *   put:
 *     summary: Actualiza una organización por ID (solo admin)
 *     tags: [Organizaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId de la organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizacionCreateUpdate'
 *     responses:
 *       200:
 *         description: OK
 *       403:
 *         description: Solo administradores
 *       404:
 *         description: No encontrado
 *       422:
 *         description: Validación fallida (Joi)
 */
router.put(
    '/:organizacionId',
    authenticateToken,
    authorizeRoles('admin'),
    ValidateJoi(Schemas.organizacion.update),
    controller.updateOrganizacion
);

/**
 * @openapi
 * /organizaciones/{organizacionId}:
 *   delete:
 *     summary: Elimina una organización por ID (solo admin)
 *     tags: [Organizaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId de la organización
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 *       403:
 *         description: Solo administradores
 *       404:
 *         description: No encontrado
 */
router.delete('/:organizacionId', authenticateToken, authorizeRoles('admin'), controller.deleteOrganizacion);

export default router;