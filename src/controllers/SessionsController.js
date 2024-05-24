const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs"); // fcn p/ comparar a criptografia
const authConfig = require("../configs/auth"); // importando config de auth
const { sign } = require("jsonwebtoken"); // mét do jwt

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

    const { secret, expiresIn } = authConfig.jwt;

    // usando o mét sign do JWT:
    const token = sign({}, secret, { // obj vazio p/ configs adicionais
      subject: String(user.id), // conteúdo a ser inserido no token
      expiresIn // expiração do token
    });

    // devolvendo usuário e token:
    return response.json({user, token});
  }
}

module.exports = SessionsController;
