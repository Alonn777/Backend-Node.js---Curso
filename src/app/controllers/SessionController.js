import jwt from "jsonwebtoken"
import User from "../models/User.js";
import AuthConfig from '../../config/auth.js'

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({ error: "User not found!" })
        }
        if (!(await user.checkPassword(password))) {
            return res.status(404).json({ error: "Password not match!" })
        }
        const {id, name} = user;
        return res.json({
            user: {
                id, name, email
            },
            token:  jwt.sign({id}, AuthConfig.secret, {
                expiresIn: AuthConfig.expiresIn
            }),
        })

    }
}

export default new SessionsController()