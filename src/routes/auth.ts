import express from 'express'
import * as authController from '../controllers/auth'

const router = express.Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login.
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Authorization token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Logged succesfully 
 *                 bearer:
 *                   type: string 
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0ODUyMTY2MCwiZXhwIjoxNjQ4NjA4MDYwfQ.Tx54SxNaz_dmCIf-t_q73kta7RzHDe0zIDGR7ivdRe8
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'             
 */
router.post('/login', authController.login)

export default router