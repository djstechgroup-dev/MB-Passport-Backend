require('dotenv').config()
const http = require('http')
const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const appRoutes = require('./src/routes')
const { connectDB } = require('./src/services/database.service')

async function startServer() {

      try {
            const app = express()
            const httpServer = http.createServer(app)
            const appDomain = process.env?.APP_DOMAIN || 'localhost'
            const port = process.env?.PORT || 8000

            await connectDB()
            
            app.use(morgan('dev'))
            app.use(express.json())
            app.use(cookieParser())
            app.use(cors({
                  origin: 'http://localhost:8080',
                  credentials: true
            }))
            app.use('/api', appRoutes)
            
            httpServer.listen(port, () => {
                  console.log(`Server is running on http://${appDomain}:${port}`)
            })           
      } catch (error) {
            console.log(error)
      }
}

startServer()

    
 

