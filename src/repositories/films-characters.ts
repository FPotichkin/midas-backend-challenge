import db from '../db/models'

export const create = async (filmId:number ,characterId:number)=>{
    const newFilmCharacter = {
        films_id: filmId,
        characters_id: characterId
    }
     await db.Films_Characters.create(newFilmCharacter)
}