import express from 'express'
import * as filmsController from '../controllers/films'
import { isAuth } from '../middlewares/isAuth'


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
 *         producer:
 *            type: string
 *            example: Gary Kurtz, Rick McCallum
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
 *                      example: n/a
 *                  Species: 
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 1
 *                          name: 
 *                              type: string
 *                              example: Droid
 *                  filmsId:
 *                      type: array 
 *                      items: 
 *                          type: integer
 *                          example: 1    
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
 *         description: Film title (case sensitive).
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

/**
 * @swagger
 * /films/{id}:
 *   get:
 *     tags:
 *       - films
 *     summary: Retrieve a film.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Film id.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Film detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/FilmWithCharacters'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'              
 */
 router.get('/:id', filmsController.getById)

/**
 * @swagger
 * /films/{id}/characters:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - films
 *     summary: Delete all characters from a film.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Film id.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Confirmation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Deleted Succesfully 
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'              
 */
 router.delete('/:id/characters', isAuth, filmsController.removeCharactersByFilm)

 export default router