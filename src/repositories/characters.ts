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