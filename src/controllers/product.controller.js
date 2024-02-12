const Database = require("../config/db");

const productController = {
    listProduct: () => {
        const db = new Database();
        const werehouses = db.getAll("product");
        return werehouses;
    },
    createProduct: ({ name,price }) => {
        const db = new Database();
        const product = db.create("product",{
            name: name,
            price: price
        });
        return product;
    },
    updateProduct: ({ id,name,price}) => {
        const db = new Database();
        const product = db.update("product",id,{
            name: name,
            price: price
        });
        return product;
    },
    deleteProduct: async ({ id,name,capacity }) => {
        const db = new Database();
        const product = await db.delete("product",id);
        if( product.success ){
            return { status: true };
        }
        return { status: true };
    },
    addProduct: async ({ warehouse_id,product_id,quantity }) => {
        const db = new Database();
        const warehouse = await db.getById("warehouse",warehouse_id);
        const product = await db.getById("product",product_id);

        let item = await db.search("item",{
            warehouse: warehouse.id,
            product: product.id
        });

        let boolmov = false;
        let total = 0;
        if( warehouse.capacity > quantity ){
            if( item.length == 0 ){
                item = db.create("item",{
                    warehouse: warehouse_id,
                    product: product_id,
                    quantity: quantity
                });

                boolmov = true;
            } else {
                item = item[0];
                total = item.quantity + parseInt( quantity );
                if( total <= warehouse.capacity ){
                    const putItem = await db.update("item",item.id,{
                        quantity: total
                    });
                    boolmov = true;
                } else {
                    boolmov = false;
                    return {
                        status: false,
                        message: "La cantidad a ingresar supera la capacidad de la bodega. 1"
                    }
                }
            }

            if( boolmov ){

                return {
                    status: true,
                    message: "Se agrego el producto a la bodega."
                }
            }


        } else {
            return {
                status: false,
                message: "La cantidad a ingresar supera la capacidad de la bodega. 2"
            }
        }
    },
    outProduct: async ({ warehouse_id,product_id,quantity }) => {
        const db = new Database();
        const warehouse = await db.getById("warehouse",warehouse_id);
        const product = await db.getById("product",product_id);

        let item = await db.search("item",{
            warehouse: warehouse.id,
            product: product.id
        });

        if( item.length > 0 ){
            item = item[0];

            if( item.quantity >= parseInt( quantity ) ){
                const putItem = db.update("item",item.id,{
                    quantity: item.quantity - parseInt( quantity )
                });

                return {
                    status: true,
                    message: "La salida del producto fue exitosa."
                }
            } else {
                return {
                    status: true,
                    message: "La cantidad del producto solicitado es mayor al stock"
                }
            }

        } else {

        }

    }
}

module.exports = productController;