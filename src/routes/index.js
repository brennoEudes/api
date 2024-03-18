// A missão desse arquivo é reunir todos os grupos de rotas da aplicação!

const { Router } = require("express");

const usersRouter = require("./users.routes"); // grupo de rotas do usuário

const routes = Router(); // contém todos os grupos de rotas da aplicação.

routes.use("/users", usersRouter); // toda vez q o usuário acessar a rota "/users", será redirecionado p/ usersRouter.

module.exports = routes;