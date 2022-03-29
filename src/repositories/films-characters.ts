import db from '../db/models'

export const create = async (filmId:number ,characterId:number)=>{
    const newFilmCharacter = {
        films_id: filmId,
        characters_id: characterId
    }
     await db.Films_Characters.create(newFilmCharacter)
}

export const getAllByFilm = async (filmId: number) =>{
    const filmsCharacters = await db.Films_Characters.findAll({
        where: {
            films_id : filmId
        },
        attributes:[
            'films_id',
            'characters_id'
        ]

    })
    return filmsCharacters
}


export const getAllByCharacter = async (characterId: number) =>{
    const characterFilms = await db.Films_Characters.findAll({
        where: {
            characters_id : characterId
        }
    })
    return characterFilms
}

export const remove = async (filmId: number) => {
    await db.Films_Characters.destroy({
        where:{
            films_id: filmId
        }
    })
}

export const truncate = async () => {
    await db.Films_Characters.destroy({
        truncate: true
    })
}