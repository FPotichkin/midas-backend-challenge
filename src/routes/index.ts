import express from 'express'
import authRouter from './auth'
import filmsRouter from './films'
import speciesRouter from './species'
import managementRouter from './management'
import swaggerRouter from '../docs/swagger'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/films', filmsRouter)
router.use('/docs', swaggerRouter)
router.use('/species', speciesRouter)
router.use('/management', managementRouter)

export default router