import { NextFunction, Request, Response } from "express"
import { AppError } from "../errorManagement/AppErrors"
import * as services from '../services/species'

export const getSpecieByName =async (req: Request, res:Response, next:NextFunction) => {
    try {
        if(!req.query.name){
            throw new AppError('Name needed', 400, 'In species Controller, getByName')
        }
        if(typeof req.query.name != 'string'){
            throw new AppError('Name needs to be a string', 400, 'In species Controller, getByName')
        }
        const species = await services.getSpecieByName(req.query.name)
        res.json({
            data: species

        })
    } catch (err) {
        next(err)
    }
}