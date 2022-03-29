import {Request, Response, NextFunction} from 'express'
import * as services from '../services/films'

export const getAll = async (req: Request, res:Response, next:NextFunction) =>{
    try{
        
        const filmsList = await services.getAll()

        res.json({
            data: filmsList
        })
    }catch(err){
        next(err)
    }
}