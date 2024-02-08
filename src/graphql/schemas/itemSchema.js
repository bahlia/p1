const { buildSchema } = require('graphql');

const itemSchema = {
    schema: `
    type Item {
        id: ID!
        warehouse: Int!
        product: Int!
        quantity: Int!
    }
    `,
    query: `
    `,
    mutation: `
    `
}

module.exports = itemSchema;