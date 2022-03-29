import axios from "axios"
import { getFilmsIds } from "./films"
import * as repository from '../repositories/characters'
import * as filmsCharactersRepository from '../repositories/films-characters'
import * as filmsCharatersServices from './films-characters'
import { getSpecie } from './species'

interface Character {
    id?: number;
    name: string;
    gender: string;
    species: string[];
    films: string[]
}
export interface internalCharacter{
    id?: number;
    name: string;
    gender: string;
    species_id: number | null | undefined;
}

interface DataValues{
    films_id: number;
    characters_id: number;
}

interface FilmCharacters{
    dataValues: DataValues

}

export const getExternalCharacters = async (urlsList: string[]) => {  
    const characters: Character[] = [];
    // first we get the characters from the external api
    const promises: Promise<void>[] = urlsList.map( async (url) => {
        return(
            axios.get(url)
            .then((resp)=>{
                let character: Character = resp.data
                character = formatCharacter(character)
        
                characters.push(character)
            })
        )
    });

    await Promise.all(promises)

    for (let index = 0; index < characters.length; index++) {
        // here we check if the characters already exist, if not we create it
        const characterInDb = await repository.getByName(characters[index].name)
        // then look their films
        const filmsIds: number[] = await getFilmsIds(characters[index].films)
        if(!characterInDb){
            // then we look for theirs species
            const specieId = await getSpecie(characters[index].species)
            const modelCharacter: internalCharacter = {
                name: characters[index].name,
                gender: characters[index].gender,
                species_id: specieId,
            } 
            const newCharacter = await repository.create(modelCharacter)
            for (const filmId of filmsIds) {
                await filmsCharatersServices.create(filmId, newCharacter.id)
            }
        }else{
            for (const filmId of filmsIds) {
                await filmsCharatersServices.create(filmId, characterInDb.id)
            }
        }
    }
}



export const removeCharactersByFilm = async (filmId: number) => {

    // First we get all the characters from a specific film
    const charactersOfFilm: FilmCharacters[] = await filmsCharactersRepository.getAllByFilm(filmId)
    
    // Then we see which one of this have more than one film, the ones who does'nt we keep them in singleFilmCharacters
    const singleFilmCharacters: number[] = []
    for (const character of charactersOfFilm) {

        const filmsOfCharacters: FilmCharacters[] =await filmsCharactersRepository.getAllByCharacter(character.dataValues.characters_id)
        if(filmsOfCharacters.length < 2){     

            singleFilmCharacters.push(character.dataValues.characters_id)
        }
 
    }
    // Here we unlink all the characters from the specific film
    await filmsCharactersRepository.remove(filmId)
    // And finally we erase the characters with only one film
    for (const character of singleFilmCharacters) {
        await repository.remove(character)
    }


}

const formatCharacter = (character: Character)=>{
    const formatedCharacter: Character = {
        name : character.name,
        species: character.species,
        gender: character.gender,
        films: character.films
    }
    return formatedCharacter
}