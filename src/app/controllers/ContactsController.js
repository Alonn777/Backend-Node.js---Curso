import Contact from "../models/Contact.js";
import Customers from "../models/Customers.js";
import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO, roundToNearestHours } from 'date-fns'
import Customer from "../models/Customers.js";


class ContactController {

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
        let where = { customer_id: req.params.customerID }
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
        const data = await Contact.findAll({
            where,
            include: [
                {
                    model: Customers,
                    attributes: ["id", "status"],
                    required: true

                }
            ],
            order,
            limit,
            offset: limit * page - limit
        })
        return res.json(data)
    }

    async find(req, res) {
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerID,
                id: req.params.id
            },
            attributes: { exclude: ["CustomerId"] }
        })
        if (!contact) return res.status(404).json({ Error: "Erro na busca do cliente" })
        return res.status(200).json(contact)
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
        const contact = await Contact.create({
            ...req.body,
            customer_id: req.params.customerID,

        })
        return res.status(201).json(contact)
    }
    // Atualiza um item existente
    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: "Erro no schema validate" })
        }

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerID,
                id: req.params.id
            },
        })

        await contact.update(req.body)

        return res.status(200).json(contact)
    }
    // Deleta um item
    async delete(req, res) {
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerID,
                id: req.params.id
            },
        })

        if (!contact) {
            return res.json({ Error: "Objeto não existente para deletar" })
        }
        await contact.destroy()
        return res.json({ Message: "Deletado copm sucesso" })
    }
}

export default new ContactController()