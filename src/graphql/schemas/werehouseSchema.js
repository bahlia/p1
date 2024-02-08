const { buildSchema } = require('graphql');

const werehouseSchema = {
    schema: `
    type Warehouse {
        id: ID!
        name: String!
        capacity: Int!
    }
    `,
    query: `
    listWerehouse: [Warehouse]
    `,
    mutation: `
    
    createWerehouse(name: String!, capacity: Int!): Warehouse
    updateWerehouse(id: ID!,name: String!, capacity: Int!): Warehouse
    deleteWerehouse(id: ID!): Response
    `
}

module.exports = werehouseSchema;