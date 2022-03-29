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

const formatCharacter = (character: character)=>{
    const formatedCharacter: character = {
        name : character.name,
        species: character.species,
        gender: character.gender
    }
    return formatedCharacter
}