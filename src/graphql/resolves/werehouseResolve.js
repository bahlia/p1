const werehouseController = require("../../controllers/werehouse.controller");

// Resolvers
const werehouseResolve = {
    listWerehouse : werehouseController.listWerehouse,
    createWerehouse : werehouseController.createWerehouse,
    updateWerehouse : werehouseController.updateWerehouse,
    deleteWerehouse : werehouseController.deleteWerehouse,
};

module.exports = werehouseResolve;