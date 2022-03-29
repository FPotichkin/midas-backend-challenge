import {Request, Response, NextFunction} from 'express'
import { performance } from 'perf_hooks'
import { AppError } from '../errorManagement/AppErrors'
import * as services from '../services/films'

export const getAll = async (req: Request, res:Response, next:NextFunction) =>{
    const t1 = performance.now()
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
        const t2 = performance.now()
        console.log('The performance is' + (t2-t1))
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
    const filmsList = await services.searchAllByTitle(title)
    return filmsList
}

export const getById = async (req: Request, res:Response, next:NextFunction) =>{
    try {
        const film = await services.getById(Number(req.params.id))
        res.json({
            data: film
        })
    } catch (err: any) {
        next(err)
    }
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