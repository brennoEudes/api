// A missão desse arquivo é reunir todos os grupos de rotas da aplicação!

const { Router } = require("express");

const usersRouter = require("./users.routes"); // grupo de rotas do usuário
const notesRouter = require("./notes.routes"); // grupo de rotas das notas

const routes = Router(); // contém todos os grupos de rotas da aplicação.

routes.use("/users", usersRouter); // toda vez q o usuário acessar a rota "/users", será redirecionado p/ usersRouter.
routes.use("/notes", notesRouter ); // toda vez q o usuário acessar a rota "/notes", será redirecionado p/ usersRouter.

module.exports = routes;