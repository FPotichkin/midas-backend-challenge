import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config()
import { AppError } from '../errorManagement/AppErrors';
import * as repository from '../repositories/auth'
import {secret} from '../middlewares/isAuth'
 

interface Credentials {
    username: string;
    password: string;
}

interface User extends Credentials {
    id: number;
}


export const login = async (credentials: Credentials)=>{
    const user: User = await repository.getUser(credentials.username)
    const match: boolean = await bcrypt.compare( credentials.password, user.password )
    if(!match){
        throw new AppError('Wrong credentials', 401, 'at login')
    }
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },secret, {expiresIn: '1d'})
    
    return token
}