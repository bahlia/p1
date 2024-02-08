const userController = require("../../controllers/user.controller");

// Resolvers
const userResolve = {
  register : userController.register,
  login : userController.login,
};

module.exports = userResolve;