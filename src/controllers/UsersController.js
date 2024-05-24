const { hash, compare } = require("bcryptjs"); // pega fcn geradora de criptografia

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

  // Formato depois e integrado DB:

  // FUNÇÃO CREATE
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

    // variável que chama fcn hash com 2 parâmetros, a senha o SALT (fator de complexidade):
    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json(); // devolve status q foi criado c/ json vazio
  }

  // FUNÇÃO UPDATE
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    //const { id } = request.params; Não é mais necessário quando passamos a pegar o id no corpo da REQ
    const user_id = request.user.id; // pegando o user id dentro do corpo da REQ

    const database = await sqliteConnection(); // conexão com banco de dados
    // buscamos o usuário pelo id. Dentro do parênteses, usamos código formato SQL p/verificar o id. Usamos tb "?" c/ um vetor p/variável q queremos substituir.
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    // verificando se o email inserido existe:
    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    // verificando se o email inserido não está associado a um outro id de usuário:
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso!");
    }

    // atualiza os dados (c/ nullish operator: se tiver conteúdo no input, atualiza input. Se não, mantém o conteúdo do DB, evitando que o campo fique vazio):
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // verificando se o usuário informou a senha antiga:
    if (password && !old_password) {
      throw new AppError("Informe a sua senha antiga!");
    }

    // Usamos o método "compare" de bcrypt p/ verificar a senha antiga digitada c/ a senha do user no DB, pois as senhas são criptografadas:
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      // se senha digitada não conferir com a do DB:
      if (!checkOldPassword) {
        throw new AppError("Senha antiga não confere!");
      }

      // se conferir, atualiza criptografada:
      user.password = await hash(password, 8);
    }

    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, user_id] // Substituímos fcn JS Date() por fnc DB DATETIME() p/ ficar no formato correto no DB.
    );

    return response.status(200).json(); // se omitir o status, ele retorna 200 por padrão
  }
}

module.exports = UsersController;
