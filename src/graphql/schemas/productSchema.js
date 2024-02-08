const { buildSchema } = require('graphql');

const productSchema = {
    schema: `
    type Product {
        id: ID!
        name: String!
        price: Float!
    }
    `,
    query: `
    listProduct: [Product]
    `,
    mutation: `
    createProduct(name: String!, price: Float!): Product
    updateProduct(id: ID!,name: String!, price: Float!): Product
    deleteProduct(id: ID!): Response
    addProduct(warehouse_id: ID!, product_id: ID!, quantity: Int!): Response
    outProduct(warehouse_id: ID!, product_id: ID!, quantity: Int!): Response
    `
}

module.exports = productSchema;