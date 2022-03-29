import express from 'express'
import * as filmsController from '../controllers/films'


const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     BasicFilm:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: A New Hope
 *         director:
 *           type: string
 *           example: George Lucas
 *         createdAt:
 *           type: string
 *           example: 2022-02-07T11:05:33.000Z
 *         updatedAt:
 *           type: string
 *           example: 2022-02-07T11:05:33.000Z
 *         release_date:
 *           type: string
 *           example: George Lucas
 *         external_url:
 *           type: string
 *           example: https://swapi.dev/api/films/1/
 *     FilmWithCharacters:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: A New Hope
 *         director:
 *           type: string
 *           example: George Lucas
 *         createdAt:
 *           type: string
 *           example: 2022-02-07T11:05:33.000Z
 *         updatedAt:
 *           type: string
 *           example: 2022-02-07T11:05:33.000Z
 *         release_date:
 *           type: string
 *           example: George Lucas
 *         external_url:
 *           type: string
 *           example: https://swapi.dev/api/films/1/     
 *         Characters: 
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  gender: 
 *                      type: string
 *                      example: male
 *                  Species: 
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 1
 *                          name: 
 *                              type: string
 *                              example: Droid
 *                          
 *   responses:
 *     BadRequest:
 *       description: 400
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Resource needs to be ...
 *     Unauthorized:
 *       description: 401
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Token needed, must log in first
 *     NotFound:
 *       description: 404
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Resource with {variable} not found
 *     InternalServerError:
 *       description: 500
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Internal Server Error
 */

/**
 * @swagger
 * /films:
 *   get:
 *     tags:
 *       - films
 *     summary: Retrieve all films.
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         description: Film title.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of all films.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: 
 *                     $ref: '#/components/schemas/BasicFilm'            
 *       500:
 *         $ref: '#/components/responses/InternalServerError'   
 */

 router.get('/', filmsController.getAll)

 export default router