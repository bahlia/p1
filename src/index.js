const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;
const schema = require("./graphql/schema");
const authSchema = require("./graphql/authSchema");
const userResolve = require("./graphql/resolves/userResolve");
const werehouseResolve = require("./graphql/resolves/werehouseResolve");
const productResolve = require("./graphql/resolves/productResolve");
const movimientoResolve = require("./graphql/resolves/movimientoResolve");


const app = express();

app.use(bodyParser.json());

const root = {...userResolve,...werehouseResolve,...productResolve,...movimientoResolve};

// app.use('/graphql', (req, res, next) => {
//   // const token = req.headers.authorization.split(" ")[1];

//   // jwt.verify( token, "API_KEY", (err, decoded) => {
//   //   if (err) {
//   //     // El token es inválido o ha expirado
//   //     console.error('Error al verificar el token:', err.message);
//   //   } else {
//   //     // El token es válido
//   //     console.log('Payload del token:', decoded);
//   //   }
//   // });

//   // let arrayQuery = req.body.query.split(" ");
//   // let type = arrayQuery[0];
//   // let query = arrayQuery[1];
//   // console.log( req.body.query.split(" ") )

//   console.log( req.headers.authorization )

//   if( req.headers.authorization != undefined ){
//     const token = req.headers.authorization.split(" ")[1];

//     jwt.verify( token, "API_KEY", (err, decoded) => {
//       if (err) {
//         // El token es inválido o ha expirado
//         console.error('Error al verificar el token:', err.message);
//       } else {
//           // El token es válido
//           console.log('Payload del token:', decoded);


//           let arrayQuery = req.body.query.split(" ");
//           let type = arrayQuery[0];
//           let query = arrayQuery[1];
//           console.log( req.body.query.split(" ") )
//           if( decoded.role == "1" ){
//             next();
//           }

//           else if( decoded.role == "2" && type == "query" ){
//             next();
//           } else {
//             res.json({
//               status: false,
//               message: "No tiene acceso a este proceso"
//             });
//           }
//       }
//     });
//   }

//   //res.send("hola")
// });

app.use('/graphql', (req, res, next) => {
  if( req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
    
        console.log("TOKEN ", token)

        jwt.verify(token, "API_KEY", (err, decoded) => {
          if (err) {
            // El token es inválido o ha expirado
            console.error('Error al verificar el token:', err.message);
          } else {
              // El token es válido
              console.log('Payload del token:', decoded);

              let arrayQuery = req.body.query.split(" ");
              let type = arrayQuery[0];
              let query = arrayQuery[1];

              console.log( type,query );
              if( decoded.role == 1 ){
                next();
              }

              else if( decoded.role == 2 && type == "query" ){
                next();
              }

              else {
                res.send({ status: false, message: "No esta autorizado." })
              }

          }
        });

  }
});

app.use('/auth', graphqlHTTP({
  schema: authSchema,
  rootValue: root,
  graphiql: true
}));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));



// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor GraphQL corriendo en http://localhost:${port}/graphql`);
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsInJvbGUiOiIxIiwiaWF0IjoxNzA3NDAzMDMzfQ.0wKmyUBVtmKcKCMCPpDhI6zynjiOdJbnm3f-DsuikUw