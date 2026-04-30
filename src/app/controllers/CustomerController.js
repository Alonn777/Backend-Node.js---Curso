import * as Yup from "yup"
import Customers from "../models/Customers.js";
import Contact from '../models/Contact.js'
import { Op } from "sequelize";
import { parseISO, roundToNearestHours } from 'date-fns'


class CustomerControllers {
    // Lista os items 

    async index(req, res) {
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updateBefore,
            updateAfter,
            sort
        } = req.query
        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let order = []
        let where = {}
        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name
                }

            }
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email
                }

            }
        }
        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase())
                }

            }
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore)
                }

            }
        }


        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter)
                }

            }
        }

        if (updateBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updateBefore)
                }

            }
        }


        if (updateAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updateAfter)
                }

            }
        }
        if (sort) {
            order = sort.split(",").map(item => item.split(":"))
        }
        const data = await Customers.findAll({
            where,
            include: [
                {
                    model: Contact,
                    attributes: ["id", "name"],


                }
            ],
            order,
            limit,
            offset: limit * page - limit
        })
        return res.json(data)
    }
    // Lista apenas o item encontrado
    async find(req, res) {
        const response = await Customers.findByPk(req.params.id)
        if (!response) return res.status(404).json({ Error: "Erro na busca do cliente" })
        return res.status(200).json(response)
    }
    // Cria um novo item
    async create(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: "Erro no schema validate" })
        }
        const response = await Customers.create(req.body)
        return res.status(201).json(response)
    }
    // Atualiza um item existente
    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: "Erro no schema validate" })
        }

        const customer = await Customers.findByPk(req.params.id);

        await customer.update(req.body)

        return res.status(200).json(customer)
    }
    // Deleta um item
    async delete(req, res) {
        const customer = await Customers.findByPk(req.params.id);

        if (!customer) {
            return res.json({ Error: "Objeto não existente para deletar" })
        }
        await customer.destroy()
        return res.json({Message: "Deletado copm sucesso"})
    }
}

export default new CustomerControllers()