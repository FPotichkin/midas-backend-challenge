import * as charactersRepository from '../repositories/characters'
import * as filmsRepository from '../repositories/films'
import * as filmsCharactersRepository from '../repositories/films-characters'
import * as speciesRepository from '../repositories/species'


export const clearDb = async () => {
    
    await filmsCharactersRepository.truncate()
    await speciesRepository.truncate()
    await charactersRepository.truncate()
    await filmsRepository.truncate()

}