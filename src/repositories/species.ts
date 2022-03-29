import { Op } from 'sequelize';
import db from '../db/models'

interface specie {
    name: string
}

export const create = async (specieName: specie)=>{
    const newSpecie = await db.Species.create(specieName);
    return newSpecie
}

export const getByName = async (name: string)=> {
    const specie = await db.Species.findAll({ 
        where: {
            name: {
                [Op.substring]: name // Case sensitive
            } 
        } 
    });
    return specie
}

export const truncate = async () => {
    await db.Species.destroy({
        truncate: true,
        cascade: true
    })
}