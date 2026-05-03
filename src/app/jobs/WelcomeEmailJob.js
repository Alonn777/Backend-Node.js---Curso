import Mail from "../../lib/Mail.js"

class WelcomeEmailJob {
    get key() {
        return "WelcomeEmail"
    }
    async handle({ data }) {
        const { email, name } = data;
        await Mail.send({
            to: email,
            subject: "Olá seja bem-vindo ao ShapeV",
            text: `olá ${name} é uma honra ter você consoco!`

        })
    }

}

export default new WelcomeEmailJob()