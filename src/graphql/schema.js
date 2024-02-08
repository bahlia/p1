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
${werehouseSchema.schema}
${productSchema.schema}
${itemSchema.schema}
${movimientoSchema.schema}

type Query {
    ${userSchema.query}
    ${werehouseSchema.query}
    ${productSchema.query}
    ${movimientoSchema.query}
}

type Mutation {
    ${userSchema.mutation}
    ${werehouseSchema.mutation}
    ${productSchema.mutation},
    ${movimientoSchema.mutation}
}
`);