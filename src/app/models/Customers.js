import { Sequelize, Model, Op } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            status: Sequelize.ENUM("ACTIVE", "ARCHIVE")
        },
            {
                sequelize,
                scopes: {
                    active: {
                        where: {
                            status: "ACTIVE"
                        },
                        order: ["createdAt"]
                    },
                    company: {
                        where: {
                            name: "ShapeV"
                        },
                        order: ["createdAt"]
                    },
                    created(date) {
                        return {
                            where: {
                                createdAt: {
                                    [Op.gte]: date
                                }
                            }
                        }
                    }
                },
                
                hooks: {
                    beforeValidate: (customer, options) => {
                        customer.status = "ARCHIVE"
                    }
                },
              
                tableName: "xxx"

            },
        )
    }
    static associate(models) {
        this.hasMany(models.Contact)
    }
}

export default Customer