const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite"); // importe conexão com bando de dados

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
  // Formato antes do DB:
  // create(request, response) {
  //   const { name, email, password } = request.body; // agora, acessamos o corpo da REQ!

  //   if (!name) {
  //     throw new AppError("Nome é obrigatório!");
  //   }

  //   response.status(201).json({ name, email, password }); // já volta no padrão JSON (obj)
  // }

  async create(request, response) {
    const { name, email, password } = request.body; // agora, acessamos o corpo da REQ!

    const database = await sqliteConnection(); // conexão com banco de dados

    // verifica email user: usamos "get" pq buscamos info. Dentro do parênteses, usamos código formato SQL p/verificar o email. Usamos tb "?" c/ um vetor p/variável q queremos substituir.
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail está em uso!");
    }

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, password]
    );

    return response.status(201).json(); // devolve status q foi criado c/ json vazio
  }
}

module.exports = UsersController;
