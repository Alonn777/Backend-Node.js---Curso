import './database'
import Customer from './app/models/Customers.js'
import Contact from './app/models/Contact.js'
import { Op } from 'sequelize'

class Playground {
    static async play() {

        const customers = await Customer.create({
            name: "Empresa 2",
            email: "empresa@gmail.com"
        })

        // const customers = await Customer.findByPk(1231)
        // const customers = await Customer.findOne({
        //     attributes: {exclude: 'createdAt'}
        // })

        // const CustomersAGR = await Customer.max("createdAt", {
        //     where: {
        //         status: "ACTIVE"
        //     }
        // })
       
        // const customers = await Customer.findAll({
        //     include: [{
        //         model: Contact,
        //         where: {
        //             status: "ACTIVE"
        //         },
        //         required: false
        //     }],
        //     attributes: { exclude: 'createdAt' },
        //     where: {
        //         [Op.or]: {
        //             status: {
        //                 [Op.in]: ["ACTIVE"]
        //             },
        //             name: {
        //                 [Op.like]: "Vilas%"
        //             }
        //         },
        //         created_at: {
        //             [Op.between]: [new Date(2025, 1, 1), new Date(2025, 12, 31)]
        //         }
        //     },
        //     order: [["name", "DESC"]],
        //     limit: 2,
        //     offset: 2 * 1 - 2,
        // })
        // console.log(JSON.stringify(customers, null, 2))
        // const customerScope1 = await Customer.scope(["active", "company"]).findAll()
        // const customerScope2 = await Customer.scope([
        //     {
        //         method: ["created", new Date(2025, 1, 1)], 
        //     },
        //     ["active"]
        // ]).findAll()
        // console.log(JSON.stringify(customerScope1, null, 2))
        // console.log(JSON.stringify(customerScope2, null, 2))

        // INSERT NO BANCO DE DADOS
        
        // const CreateCustomer = await Customer.create({
        //     name: "Logitech",
        //     email: "Logitech@gmail.com"
        // })

        // Update no banco de dados
        // const customer = await Customer.findByPk(10)
        // console.log(JSON.stringify(customer, null, 2))

        // const newCustomer = await customer.update({status: "ARCHIVE"})

        // delete no banco de dados
        //  const newCustomer = await customer.destroy()



    }
}

Playground.play()

