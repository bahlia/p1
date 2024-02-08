const Database = require("../config/db");

const werehouseController = {
    listWerehouse: () => {
        const db = new Database();
        const werehouses = db.getAll("warehouse");
        return werehouses;
    },
    createWerehouse: ({ name,capacity }) => {
        const db = new Database();
        const werehouse = db.create("warehouse",{
            name: name,
            capacity: capacity
        });
        return werehouse;
    },
    updateWerehouse: ({ id,name,capacity }) => {
        const db = new Database();
        const werehouse = db.update("warehouse",id,{
            name: name,
            capacity: capacity
        });
        return werehouse;
    },
    deleteWerehouse: async ({ id,name,capacity }) => {
        const db = new Database();
        const werehouse = await db.delete("warehouse",id);
        if( werehouse.success ){
            return { status: true }
        }
        return { status: true }
    },
}

module.exports = werehouseController;