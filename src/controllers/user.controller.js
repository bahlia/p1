const Database = require("../config/db");
const hashString = require("../helpers/hash");
var jwt = require('jsonwebtoken');


const userController = {
    register : async ({username,password,role}) => {

        console.log( "LOGIN ", username,password,role )

        const db = new Database();
        let pass = hashString( password );
        const response = await db.create('users',{
            username: username,
            password: pass,
            rol_id: role,
            status: true
        });

        if( response ){
            const token = jwt.sign({ id: response.id, role: response.rol_id }, 'API_KEY');

            const put = await db.update('users',response.id,{
                access_token: token
            });

            return { accessToken: token };
        }
        
    },
    login: async ({ username,password }) => {
        let pass = hashString( password );
        const db = new Database();
        console.log(username);
        const user = await db.search("users",{
            username: username
        });

        if( user.length > 0 ){
            if( user[0].password == pass ){
                const token = jwt.sign({ id: user[0].id, role: user[0].rol_id }, 'API_KEY');
                return {
                    accessToken: user[0].access_token
                }
            }
        }

    }
}

module.exports = userController;