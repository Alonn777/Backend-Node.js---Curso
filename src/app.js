import express from 'express'
import routes from './routes.js'
import './database/index.js'
import authMiddlewares from "./app/middlewares/auth.js"
import * as Sentry from "@sentry/node"
import SentryConfig from './config/Sentry.js'
import "dotenv/config"


class App {
    constructor() {
        this.server = express()
        // Sentry.init(SentryConfig)
        this.middlewares()
        this.routes()
        this.exceptionHandler()

    }
    // este é o método middleware ele é usado para controlarmos a rota 
    middlewares() {
        this.server.use(express.json());
    }
    routes() {
        this.server.use(routes)

    }
    exceptionHandler() {
        Sentry.setupExpressErrorHandler(this.server);

        this.server.use(async (error, req, res, next) => {
            if (process.env.NODE_ENV === "development") {
                console.error(error)
                return res.status(500).json({
                    message: error.message,
                    stack: error.stack
                })
            }

            return res.status(500).json({ error: "internal server error", message: error.message })
        })
    }
}
const app = new App()

export default app.server