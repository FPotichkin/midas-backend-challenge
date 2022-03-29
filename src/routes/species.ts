import express from 'express'
import * as speciesController from '../controllers/species'

const router = express.Router()
/** 
 * @swagger
 * components:
 *   schemas:
 *     Specie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Droid
 *         createdAt:
 *           type: string
 *           example: 2022-02-07T11:05:33.000Z
 *         updatedAt:
 *           type: string
 *           example: 2022-02-07T11:05:33.000Z
 */

/**
 * @swagger
 * /species:
 *   get:
 *     tags:
 *       - specie
 *     summary: Search for a specie with x name and retrieve it.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Specie name (case sensitive).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of coincidentials films.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   properties: 
 *                     filmsList:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Specie'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *                     
 */
router.get('/', speciesController.getSpecieByName)

export default router