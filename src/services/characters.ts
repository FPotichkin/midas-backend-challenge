import axios from "axios"
import * as repository from '../repositories/characters'
import * as filmsCharactersRepository from '../repositories/films-characters'
import { getSpecie } from './species'

interface character {
    id?: number;
    name: string;
    gender: string;
    species: string[];
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

export const getExternalCharacters = async (urlsList: string[], filmId:number) => {  
    const characters: character[] = [];
    // first we get the characters from the external api
    const promises: Promise<void>[] = urlsList.map( async (url) => {
        return(
            axios.get(url)
            .then((resp)=>{
                let character: character = resp.data
                character = formatCharacter(character)
        
                characters.push(character)
            })
    
        )
    });

    await Promise.all(promises)

    for (let index = 0; index < characters.length; index++) {
        // then we look for theirs species
        const specieId = await getSpecie(characters[index].species)
        const modelCharacter: internalCharacter = {
            name: characters[index].name,
            gender: characters[index].gender,
            species_id: specieId,
        }
        // here we check if the characters already exist, if not we create it
        const characterExist = await repository.getByName(modelCharacter.name)
        if(!characterExist){
            // here is created and associated to the film
            const newCharacter = await repository.create(modelCharacter)
            await filmsCharactersRepository.create(filmId, newCharacter.id)
        }else{
            // it already exist so we only associate it to the film
            await filmsCharactersRepository.create(filmId, characterExist.id)
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

const formatCharacter = (character: character)=>{
    const formatedCharacter: character = {
        name : character.name,
        species: character.species,
        gender: character.gender
    }
    return formatedCharacter
}