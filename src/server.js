import "./instrument.js"
import "dotenv/config"
import server from './app.js'
server.listen(process.env.PORT)