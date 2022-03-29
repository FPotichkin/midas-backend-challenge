import axios from "axios"
import * as repository from '../repositories/films'

interface filmDetails{
    title: string;
    director: string;
    producer: string;
    release_date: Date;
    characters?: object;
}
interface externalfilmDetails extends filmDetails {
    characters?: string[];
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
    external_url: string;
    Characters: object[];
}


export const getAll = async ()=>{
    // first we look in the db
    let filmsList = await repository.getAll()
    // if there are not films we request them from the external API
    if(filmsList.length === 0){
        const resp = await axios.get('https://swapi.dev/api/films/')
        const {results} = resp.data
        const externalfilmsList: externalfilmDetails[] = results.map((film: externalfilmDetails)=>{
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
        // and get them from our db to give them with proper id
        filmsList = await repository.getAll()
    }
    //Finally we return the films
    return filmsList
}
export const getByTitle =async (title: string) => {
    const films: internalFilmDetails[] = await repository.getByTitle(title)
    return films
}