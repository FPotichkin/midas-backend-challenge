import {Request, Response, NextFunction} from 'express'
import { AppError } from '../errorManagement/AppErrors'
import * as services from '../services/films'

export const getAll = async (req: Request, res:Response, next:NextFunction) =>{
    try{
        let filmsList
        if(!req.query.title){
            filmsList = await services.getAll()
        }else{
            if(typeof req.query.title != 'string'){
                throw new AppError('Title needs to be a string', 400, 'In films Controller, getByTitle')
            }
            filmsList = await getAllByTitle(req.query.title)
        }
        res.json({
            data: filmsList
        })
    }catch(err){
        next(err)
    }
}

const getAllByTitle = async (title: string) => {
    if(!title){
        throw new AppError('Title needed', 400, 'In films Controller, getByTitle')
    }
    const filmsList = await services.getByTitle(title)
    return filmsList
}

export const getById = async (req: Request, res:Response, next:NextFunction) =>{
    const film = await services.getById(Number(req.params.id))
    res.json({
        data: film
    })
}

export const removeCharactersByFilm = async (req: Request, res:Response, next:NextFunction) =>{
    try {
        await services.removeCharactersByFilm(Number(req.params.id))
        res.json({
            msg: 'Deleted succesfully'
        })
    } catch (err) {
        next(err)
    }
}