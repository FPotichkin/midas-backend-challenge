import db from '../db/models'

export const getUser = async (username: string) =>{
    const user = await db.Users.findOne({where:{username}})
    return user
}