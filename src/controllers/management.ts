import { Request, Response, NextFunction } from 'express'
import * as service from '../services/management'

export const clearDb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await service.clearDb()
        res.json({
            msg: 'Database cleared succesfully'
        })
    } catch (err) {
        next(err)
    }
}