import db from '../db/models'
import {internalCharacter} from '../services/characters'

export const create = async (newCharacter: internalCharacter)=>{
    const createdCharacter = await db.Characters.create(newCharacter)
    return createdCharacter

}

export const getByName = async (name: string) => {
    const character = await db.Characters.findOne({ where: { name } })
    return character   
}

export const remove = async (id: number) => {
    await db.Characters.destroy({
        where:{
            id
        }
    })
}

export const truncate = async () => {
    await db.Characters.destroy({
        truncate: true,
        cascade: true
    })
}