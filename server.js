require('dotenv').config()
const http = require('http')
const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const swaggerUI = require("swagger-ui-express") 
const swaggerJsDoc = require("swagger-jsdoc") 
const appRoutes = require('./src/routes')
const { connectDB } = require('./src/services/database.service')

const appDomain = process.env?.APP_DOMAIN || 'localhost'
const port = process.env?.PORT || 8000

const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "MYRTLE BEACH PASSPORT API",
          version: "1.0.0",
          description: "Myrtle Beach Passport API"
        },
        servers: [
          {
            url: `http://${appDomain}:${port}`,
            description: "Myrtle Beach Passport API Documentation",
          },
        ],
      },
      apis: ["./src/routes/*.route.js"],
    }

async function startServer() {

      try {
            const app = express()
            const httpServer = http.createServer(app)

            const specs = swaggerJsDoc(options)

            await connectDB()
            
            app.use(morgan('dev'))
            app.use(express.json())
            app.use(cookieParser())
            app.use(cors({
                  origin: 'http://localhost:8080',
                  credentials: true
            }))
            
            app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
            app.use('/api', appRoutes)
            
            httpServer.listen(port, () => {
                  console.log(`Server is running on http://${appDomain}:${port}`)
            })           
      } catch (error) {
            console.log(error)
      }
}

startServer()

    
 

