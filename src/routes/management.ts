import express from 'express'
import * as managerController from '../controllers/management'
import { isAuth } from '../middlewares/isAuth'

const router = express.Router()

/**
 * @swagger
 * /management/cleardb:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - management
 *     summary: Delete all data base.
 *     responses:
 *       200:
 *         description: Confirmation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     msg:
 *                       type: string
 *                       example: Database cleared succesfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'         
 *          
 *                     
 */
router.delete('/cleardb', isAuth, managerController.clearDb)

export default router