const Database = require("../config/db");

const movimientoController = {
    listMovimientos: async () => {
        const db = new Database();
        const movimientos = await db.getAll("movimiento");
        return movimientos;
    },
    transaction: async ({origin,destination,product,quantity}) => {
        console.log( "MOV 0 ", origin,destination,product,quantity );

        const db = new Database();

        const from = await db.getById("warehouse",origin);
        const to = await db.getById("warehouse",destination);

        const prod = await db.getById("product",product);

        let fromItem = await db.search("item",{
            warehouse: from.id,
            product: prod.id
        });

        let toItem = await db.search("item",{
            warehouse: to.id,
            product: prod.id
        });

        if( fromItem.length > 0 ){
            fromItem = fromItem[0];
        }

        if( toItem.length > 0 ){
            toItem = toItem[0];
        }

        let total = quantity + toItem.quantity;

        console.log( "STOCK ", from ,prod,fromItem.quantity , quantity );

        if( fromItem.quantity >= quantity ){
            if( to.capacity >= total  ){

                await db.update("item", fromItem.id ,{
                    quantity: fromItem.quantity - quantity
                });

                await db.update("item", toItem.id ,{
                    quantity: toItem.quantity + quantity
                });

                const movimiento = db.create("movimiento",{
                    date: new Date(),
                    origin: from.id,
                    destination: to.id,
                    product: prod.id,
                    quantity: quantity
                });

                return {
                    status: true,
                    message: "transaccion realizada con exito."
                }

            } else {
                return {
                    status: false,
                    message: "La capacidad de la bodega no soporta la cantidad enviada"
                }
            }
        } else {
            return {
                status: false,
                message: "La cantidad a transferir es mayor al stock."
            }
        }

        console.log( "MOV = ", from,to,prod,fromItem, toItem );
    }
}

module.exports = movimientoController;