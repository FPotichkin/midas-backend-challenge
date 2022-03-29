import axios from 'axios'
import * as repository from '../repositories/species'

interface externalSpecie {
    name: string
}
interface internalSpecie extends externalSpecie{
    id: number
}

export const getSpecie = async (urlArray: string[]) =>{
    // the single url comes in an array...
    // if it hasn't have an specie then it's null, otherwise...
    if(urlArray.length > 0){
        const url = urlArray[0]
        // we get the specie from the external api
        const resp = await axios.get(url)
        const externalSpecie: externalSpecie = resp.data
        // we check if it existe
        const specie: internalSpecie[] = await repository.getByName(externalSpecie.name)
        // if not we create it
        if(specie.length === 0){
            const Newspecie:internalSpecie = await repository.create({name: externalSpecie.name})
            return (Newspecie.id)
        }
        return specie[0].id
    }  
}

export const getSpecieByName =async (name: string) => {
    const species = await repository.getByName(name)
    return species
}