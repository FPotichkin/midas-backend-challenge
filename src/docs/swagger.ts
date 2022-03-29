import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

import express from 'express'

const router = express.Router()

const swaggerDefinition = {
    openapi: '3.0.0',
    info:{
        title: 'Express Api for Swapi clon',
        version: '1.0.0'
    },
    servers:[
        {
            url: 'http://localhost:8000/api',
            description: 'Development server'
        }
    ]
}

const options = {
    swaggerDefinition,
    apis:[
          "./src/routes/*.ts"
        ]
}

const swaggerSpec = swaggerJSDoc(options)

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router