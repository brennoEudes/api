require("express-async-errors"); // precisa ser aqui no início de tudo!

// const database = require("./database/sqlite"); // importe database
const migrationsRun = require("./database/sqlite/migrations"); // importe migrations (substitui o import database)

const AppError = require("./utils/AppError"); // importe p/ configurar o tratamento de exceções!

const uploadConfig = require("./configs/upload"); // importe p/ acessar imgs

const express = require("express"); // importando tudo da pasta "express" q está dentro da node_modules

const routes = require("./routes"); // importa como padrão o index.js da pasta routes.

migrationsRun(); // executa o banco de dados (substitui o database())

const app = express(); // inicializando o express

app.use(express.json()); // informa a aplicação q vamos receber as informações enviadas no corpo da REQ no formato json!

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); 

app.use(routes); // usa todos os grupos de rotas da aplicação, recebidos do index.js da pasta routes.

// database(); // executa o banco de dados

// informa a rota
// app.get("/message/:id/:user", (request, response) => {
//   // response.send(`
//   // Id message is ${request.params.id},
//   // and the user is ${request.params.user}
//   // `); // responde a uma REQ feita na porta configurada!

//   // tb pode ser feito desestruturando, p/evitar a repetição de request.params:
//   const { id, user } = request.params; // "pescaria"

//   response.send(`
//   Id message is ${id},
//   and the user is ${user}
//   `); // responde a uma REQ feita na porta configurada!
// });

// app.get("/users", (request, response) => {
//   const { page, limit } = request.query;

//   response.send(`
//   The page is ${page} and the limit is ${limit}
//   `);
// });

app.use((error, request, response, next) => {
  // se erro do client:
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  // se erro do server:
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = 3000; // criando a porta (restaurante) onde a api (garçom/porteiro) ficará observando, esperando REQs e devolvendo RESs;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); // "escute os pedidos neste restaurante" e fcn imprime uma msg.
