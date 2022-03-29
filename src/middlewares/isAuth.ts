import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '../errorManagement/AppErrors'

export const secret: any = process.env.SECRET

export const isAuth = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const authorization = req.headers.authorization

        if(!authorization){
            const error = new AppError('Token needed', 401, '')
            next(error)
        }else{
            const [,token] = authorization.split(' ')
            jwt.verify(token, secret)
            next()
        }
    } catch (err) {
        const error = new AppError('Token invalid', 401, '')
        next(error)
    }
}