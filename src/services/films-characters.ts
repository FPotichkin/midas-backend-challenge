import * as repository from '../repositories/films-characters'

export const create = async (filmsId: number, charactersId: number)=>{
    const filmCharacter = await repository.getByIds(filmsId, charactersId)
    if(!filmCharacter){
        await repository.create(filmsId, charactersId)
    }
}