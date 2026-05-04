import * as Yup from "yup"
import { Op } from "sequelize";
import { parseISO, roundToNearestHours } from 'date-fns';
import User from "../models/User.js";
import Mail from "../../lib/Mail.js";
// import Queue from "../../lib/Queue.js";
import WelcomeEmailJob from "../jobs/WelcomeEmailJob.js";

class UsersControllers {

    async index(req, res) {
        const {
            name,
            email,
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
        const data = await User.findAll({
            attributes: { exclude: ["password_hash", "password"] },
            where,
            order,
            limit,
            offset: limit * page - limit
        })
        console.log({ userid: req.userId })

        console.log(User.findByPk(req.userId))
        return res.json(data)
    }
    async find(req, res) {
        const user = await User.findByPk(req.params.id)
        if (!user) return res.status(404).json({ Error: "Erro na busca do cliente" })
        return res.status(200).json(user)
    }
    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().when("password", (password, field) => {
                return password ? field.required().oneOf([Yup.ref("password")]) : field;
            })
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: "Erro no schema validate" })
        }
        const { id, name, email, createdAt, updatedAt } = await User.create(req.body)

        await Mail.send({
            to: email,
            subject: "Olá seja bem-vindo ao ShapeV",
            text: `olá ${name} é uma honra ter você consoco!`

        })
        // await Queue.add(WelcomeEmailJob.key, { name, email })
        return res.status(201).json({ id, name, email, createdAt, updatedAt })
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8)
                .when("oldPassword", (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref("password")])
                        : field
            ),
        });

        await schema.validate(req.body, { abortEarly: false });

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json();
        }

        const { oldPassword } = req.body;

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: "User password not match" });
        }

        await user.update(req.body);

        const { id, name, email, updatedAt, createdAt } = user;

        return res.status(200).json({ id, name, email, updatedAt, createdAt });
    }

    async delete(req, res) {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json()
        }
        await user.destroy()

        return res.json()
    }
}

export default new UsersControllers()