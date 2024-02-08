const { buildSchema } = require('graphql');

const movimientoSchema = {
    schema: `
    type Movimiento {
        id: ID!
        date: String!
        origin: Int!
        destination: Int!
        product: Int!
        quantity: Int!
    }
    `,
    query: `
    listMovimientos: [Movimiento]
    `,
    mutation: `
    transaction(origin: ID!,destination: ID!,product: ID!,quantity: Int!): Response
    `
}

module.exports = movimientoSchema;