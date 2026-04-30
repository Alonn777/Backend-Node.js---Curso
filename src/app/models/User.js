import { Sequelize, Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            //1 - senha virtual que não é salva no banco
            password: Sequelize.VIRTUAL,
            // 2 - senha criptografada que é salva no banco
            password_hash: Sequelize.STRING,
        },
            {
                sequelize,
                name: {
                    singular: "user",
                    plural: "users"
                }
            }
        )

        // 3 - Hook que cria o password hash
        this.addHook("beforeSave", async (user) => {

            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })

        return this
    };

    // 4 - Método de comparação da senha digitada com o hash que está no banco
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User