const { Router } = require("express"); // IMPORTA o router do express, pois até então, ele estava somente no server.js
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router(); // INICIALIZA o router;
const upload = multer(uploadConfig.MULTER); // inicia o multer

// Exemplo de Middleware:
// function myMiddleware(request, response, next) {
//     console.log("Você passou pelo middleware!")
//     console.log(request.body)

//     next(); //fcn que chama a próx. fcn a ser executada pelo middleware
// }

const usersController = new UsersController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

/* ANTES DO CONTROLLER */
// // altera app p/ userRoutes (Tiramos o "users" depois q criamos o routes.use no index.js)
// usersRoutes.post("/", (request, response) => {
//   //const { name, email, password } = request.body; // agora, acessamos o corpo da REQ!

//   // forma simples
//   //response.send(`${name}, ${email}, ${password}`);

//   //forma padrão JSON (USAR ESSA!):
//   //response.json({ name, email, password }); // já volta no padrão JSON (obj)
// });

/* DEPOIS DO CONTROLLER */
usersRoutes.post("/", usersController.create); // quando for usar middleware, podemos na rota depois do caminho "/";

usersRoutes.put("/", ensureAuthenticated, usersController.update); // mudamos o método HTTP e passando id como parâmetro
// Ao passaramos a usar a autenticação(ensureAuthenticated), necessária caso o usuário queira realizar qq tipo de edição, já não será mais necessário passar o id como parâmtero

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (request, response) => {
    console.log(request.file.filename);
    response.json();
  }
); // usamos "patch" p/ atualizar um campo específico

module.exports = usersRoutes; // exporta as rotas p/ server.js e outros arquivos usarem!
