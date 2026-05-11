import { Sequelize } from "sequelize";
import config from '../config/database.js'
import Customers from '../app/models/Customers.js'
import Contact from '../app/models/Contact.js'
import User from '../app/models/User.js'

const models = [Customers, Contact, User]

class Database {
    constructor() {
        if (config.url) {
            this.connection = new Sequelize(config.url, config)
        } else {
            this.connection = new Sequelize(
                config.database,
                config.username,
                config.password,
                config
            )
        }

        this.init()
        this.associate()
    }

    init() {
        models.forEach(model => model.init(this.connection))
    }

    associate() {
        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models)
            }
        })
    }
}

export default new Database()