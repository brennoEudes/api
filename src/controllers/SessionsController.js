const knex = require("../database/knex");

const AppError = require("../utils/AppError");

const { compare } = require("bcryptjs"); // fcn p/ comparar a criptografia

class SessionsController {
  // criando uma sessão:
  async create(request, response) {
    const { email, password } = request.body;

    // usamos o knex p/ acessar a tabela "users" filtrando pelo campo email e pegando somente um user:
    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta!", 401);
    }

    // comparando a senha digitada c/ a senha guardada no db:
    const passwordMatched = await compare(password, user.password);

    // se não deu match:
    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta!", 401); // msm msg por segurança dos dados! (user ñ precisa saber o erro!)
    }

    return response.json(user);
  }
}

module.exports = SessionsController;
