const movimientoController = require("../../controllers/movimiento.controller");

// Resolvers
const movimientoResolve = {
    listMovimientos: movimientoController.listMovimientos, 
    transaction : movimientoController.transaction,
};

module.exports = movimientoResolve;