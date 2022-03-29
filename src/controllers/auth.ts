import { Request, Response, NextFunction} from 'express'
import * as services from '../services/auth'

export const login = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const token: string = await services.login(req.body)
        res.json({
            msg: 'Logged succesfully',
            bearer: token
        })
    } catch (err: any) {
        next(err)
    }
}