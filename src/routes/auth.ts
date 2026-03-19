import express from 'express';
import * as controller from '../controllers/auth';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Endpoints de autenticación
 *
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "admin@test.com"
 *         password:
 *           type: string
 *           example: "123456"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Login exitoso"
 *         accessToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         usuario:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "69bc1560fcd8d36f2a1f1a78"
 *             name:
 *               type: string
 *               example: "Admin Inicial"
 *             email:
 *               type: string
 *               example: "admin@test.com"
 *             organizacion:
 *               type: string
 *               example: "69b2ff5fbcff90899c5bc372"
 *             rol:
 *               type: string
 *               enum: [admin, user]
 *               example: "admin"
 *     RefreshResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Token refrescado"
 *         accessToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve el JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login correcto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', controller.login);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Refresca el token JWT
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refrescado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshResponse'
 *       401:
 *         description: Refresh token requerido, expirado o inválido
 */
router.post('/refresh', controller.refreshToken);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Cierra sesión y limpia la cookie de refresh
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout exitoso
 */
router.post('/logout', controller.logout);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario autenticado
 *       401:
 *         description: Token requerido o inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/me', authenticateToken, controller.getMe);

export default router;