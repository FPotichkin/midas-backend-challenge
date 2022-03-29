import express from 'express'
import swaggerRouter from '../docs/swagger'
import filmsRouter from './films'

const router = express.Router()

router.use('/docs', swaggerRouter)
router.use('/films', filmsRouter)

export default router