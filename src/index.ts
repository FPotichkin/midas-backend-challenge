import express from "express";
import routes from './routes/index'
import { errorHandler } from "./errorManagement/errorsHandler";


const app = express();


app.use(express.json());

app.use('/api', routes)

app.use(errorHandler)

app.listen(8000,()=>{
    console.log("Listening on port 8000")
})


