const { buildSchema } = require('graphql');
const userSchema = require("./schemas/userSchema");
const werehouseSchema = require("./schemas/werehouseSchema");
const productSchema = require("./schemas/productSchema");
const itemSchema = require("./schemas/itemSchema");
const movimientoSchema = require("./schemas/movimientoSchema");

module.exports = buildSchema(`
type Response {
    status: Boolean!
    message: String!
}

${userSchema.schema}

type Query {
    ${userSchema.query}
}

type Mutation {
    ${userSchema.mutation}
}
`);