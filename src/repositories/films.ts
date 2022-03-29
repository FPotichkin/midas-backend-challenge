import db from '../db/models'
import { Op } from 'sequelize';

export const create = async (filmsList: object[])=>{
    const promises: Promise<void>[] = filmsList.map(async (film) => {
        await db.Films.create(film)
    });
    return new Promise((resolve, reject) =>{
        Promise.all(promises).then(()=>{
            resolve (promises)
            reject()
        })
    })
}

export const getAll = async ()=>{
    const filmsList: object[] = await db.Films.findAll()
    return filmsList
}

export const getByTitle =async (title: string) => {
    const films = await db.Films.findAll({
        where:{
            title:{
                [Op.substring]: title // Case sensitive
            }
        }
    })
    return films
}

export const getById = async (id: number)=> {
    const film = await db.Films.findByPk(id, {
        include: [{
            model: db.Characters,
            attributes: [
                "id",
                "name",
                "gender",
            ],
            through:{
                attributes: []
            },
            include: [{
                model: db.Species, as:'Species',
                attributes: [
                    "id",
                    "name"
                ]
            }]
        }]
    })   
    return film
}

export const truncate = async () => {
    await db.Films.destroy({
        truncate: true,
        cascade: true
    })
}