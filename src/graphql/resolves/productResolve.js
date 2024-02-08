const productController = require("../../controllers/product.controller");

// Resolvers
const productResolve = {
    listProduct : productController.listProduct,
    createProduct : productController.createProduct,
    updateProduct : productController.updateProduct,
    deleteProduct : productController.deleteProduct,
    addProduct : productController.addProduct,
    outProduct : productController.outProduct,
};

module.exports = productResolve;