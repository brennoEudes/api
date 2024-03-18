const AppError = require("../utils/AppError");
// Usamos classe ao invés de fcn, pois a classe permite acessar diversas fcn's dentro dela.

/* 
  MÁX 5 MÉTODOS:
    index - GET p/ listar vários registros;
    show - GET p/ exibir um registro específico;
    create - POST p/ criar um registro;
    update - PUT p/ atualizar um registro;
    delete - DELETE p/remover um registro;
    */

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body; // agora, acessamos o corpo da REQ!

    if (!name) {
      throw new AppError("Nome é obrigatório!");
    }

    response.status(201).json({ name, email, password }); // já volta no padrão JSON (obj)
  }
}

module.exports = UsersController;
