import {Request, Response, NextFunction} from 'express'
import { AppError } from './AppErrors'

export const errorHandler = (err: AppError,req: Request, res: Response ,next: NextFunction)=>{
    console.log(err.where)
    if (err.statusCode < 500){
        res.status(err.statusCode).json({
            error: err.message
        })
    }else{
        res.status(500).json({
            error: 'Server Internal Error'
        })
    }
}

