const { buildSchema } = require('graphql');

const userSchema = {
    schema: `
    type User {
        id: ID!
        username: String!
        password: String!
        role: Int!
        accessToken: String
        status: Boolean!
    }
    
    
    type Role {
        id: ID!
        name: String!
    }`,
    query: `
    getUser(id: ID!): User
    `,
    mutation: `
    register(username: String!, password: String!, role: Int!): User
    login(username: String!, password: String!): User
    createUser(username: String!,password: String!, email: String!,role:  ID!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): User
    `
}


module.exports = userSchema;