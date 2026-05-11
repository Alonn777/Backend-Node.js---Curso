import { Router } from 'express'
import multer from 'multer';
import multerConfig from "./config/multer.js"
import customer from './app/controllers/CustomerController.js'
import ContactController from "./app/controllers/ContactsController.js"
import UsersController from './app/controllers/UsersController.js';
import SessionController from './app/controllers/SessionController.js';
import authMiddlewares from "./app/middlewares/auth.js"
import auth from './app/middlewares/auth.js';


const upload = multer(multerConfig)
const routes = new Router()


routes.post("/sessions", SessionController.create)
routes.post("/users", UsersController.create)

// Controla o acesso aos recurso da api
routes.use(auth)
// CUSTOMERS
routes.get("/customers", customer.index)
routes.get("/customers/:id", customer.find)
routes.post("/customers", customer.create)
routes.put("/customers/:id", customer.update)
routes.delete("/customers/:id", customer.delete)

// CONTATOS

routes.get("/customers/:customerID/contacts", ContactController.index)
routes.get("/customers/:customerID/contacts/:id", ContactController.find)
routes.post("/customers/:customerID/contacts", ContactController.create)
routes.put("/customers/:customerID/contacts/:id", ContactController.update)
routes.delete("/customers/:customerID/contacts/:id", ContactController.delete)

// USERS

routes.get("/users", UsersController.index)
routes.get("/users/:id", UsersController.find)
routes.put("/users/:id", UsersController.update)
routes.delete("/users/:id", UsersController.delete)


routes.post("/files", upload.single("file"), (req, res) => {
    console.log(req.file)
    return res.status(201).json({ message: "OK" })
})




export default routes