export class AppError extends Error {
    statusCode: number
    where: string;
    constructor(message: string, statusCode: number, where: string){

        super(message);
        this.statusCode = statusCode
        this.where = where
    }
}