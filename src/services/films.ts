import axios from "axios"
import { AppError } from "../errorManagement/AppErrors";
import * as repository from '../repositories/films'
import * as charactersService from '../services/characters'
import * as filmsCharactersRepository from '../repositories/films-characters'

interface setAttribute {
    (object: any, value:any):void
}

const addFilmsIds: setAttribute = (object:any,value:any)=>{
    object.filmsId = value
}

interface Character{
    id: number; 
    dataValues: object
}

interface filmDetails{
    title: string;
    director: string;
    producer: string;
    release_date: Date;
    characters?: object;
}
interface externalfilmDetails extends filmDetails {
    characters: string[];
    url: string;
    // episode_id: number;
    // opening_crawl: string;
    // planets: string[];
    // starships: string[];
    // vehicles: string[];
    // species: string[];
    // created: string;
    // edited: string;
}
interface internalFilmDetails extends filmDetails {
    id: number;
    external_url: string;
    Characters: Character[];
}

interface DataValues{
    films_id: number;
    characters_id: number;
}

interface FilmCharacters{
    dataValues: DataValues

}

export const getAll = async ()=>{
    // first we look in the db
    let filmsList = await repository.getAll()
    // if there are not films we request them from the external API
    if(filmsList.length === 0){
        // in charactersUrls we are gonna storage all the characters urls from all films
        const charactersUrls: string[][] = []
        const resp = await axios.get('https://swapi.dev/api/films/')
        const {results} = resp.data
        const externalfilmsList: externalfilmDetails[] = results.map((film: externalfilmDetails)=>{
            charactersUrls.push(film.characters)
            return{
                title: film.title,
                director: film.director,
                producer: film.producer,
                release_date: film.release_date,
                external_url: film.url
            }
        })
        // then create them in our db
        await repository.create(externalfilmsList)
        // then we create the characters
        for (const urls of charactersUrls) {
            await charactersService.getExternalCharacters(urls)
        }
        // then we get them with all the data
        filmsList = await repository.getAll()
    }
    //Finally we return the films
    return filmsList
}

export const searchAllByTitle =async (title: string) => {
    const films: internalFilmDetails[] = await repository.searchAllByTitle(title)
    return films
}

export const getById = async (id: number)=>{
    // validate id
    if(isNaN(id)){
        throw new AppError( 'Id must by a number', 400, 'In films Services, getById')
    }
    // first we look in the db
    let film:internalFilmDetails = await repository.getById(id)
    if(!film){
        const error: AppError = new AppError(`Film with id ${id} not found`, 404, 'In films Services, getById');
        throw error;
    }
    // if there are not characters we request them from the external API
    if(film.Characters.length === 0){
        const resp = await axios.get(film.external_url)  
        const externalFilm: externalfilmDetails = resp.data 
        if(externalFilm.characters){
            await charactersService.getExternalCharacters(externalFilm.characters)
        }
        film = await repository.getById(id)
    }
    // here we add the ids of all the films where a character appear
    for (const character of film.Characters) {
        const filmsId: number[] = []
        const filmsOfCharacters: FilmCharacters[] = await filmsCharactersRepository.getAllByCharacter(character.id)
        for (const film of filmsOfCharacters) {
            filmsId.push(film.dataValues.films_id)   
        }
        addFilmsIds(character.dataValues, filmsId)
    }
    return film
}

export const removeCharactersByFilm = async (id: number)=>{
    if(isNaN(id)){
        throw new AppError( 'Id must by a number', 400, 'In films Services, removeCharactersByFilm')
    }
    const film: internalFilmDetails = await repository.getById(id)
    if(!film){
        const error: AppError = new AppError(`Film with id ${id} not found`, 404, 'In films Services, removeCharactersByFilm');
        throw error;
    }
    await charactersService.removeCharactersByFilm(id)
}

export const getFilmsIds = async (urlsList: string[]): Promise<number[]>=>{
    
    const allFilms: internalFilmDetails[] = await repository.getAll() 
    const filmsTitles = allFilms.map((film)=>{
        return {
            title: film.title,
            id: film.id
        }
    })

    // this storage all the ids of the film where a character appears
    const filmsIds: number[] = []
    const promises: Promise<void>[] = urlsList.map( async (url) => {
        return(
            axios.get(url)
            .then(async(resp)=>{
                const externalFilm: filmDetails = resp.data
                const filmIdTitle = filmsTitles.find((element)=>{ return (externalFilm.title === element.title)})
                if(filmIdTitle){
                    filmsIds.push(filmIdTitle.id)
                }
            })
        )
    });
    await Promise.all(promises)

    return filmsIds
}
