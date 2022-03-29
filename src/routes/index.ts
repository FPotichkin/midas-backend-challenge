import express from 'express'
import swaggerRouter from '../docs/swagger'

const router = express.Router()

router.use('/docs', swaggerRouter)

export default router