const { verify } = require("jsonwebtoken"); // fcn disponível no jwt
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const auth = require("../configs/auth");

// middleware recebe o "next" p/ chamar a próx. fcn destino da REQ:
function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization; // acessando o cabeçalho da REQ

  // se ñ tiver token:
  if (!authHeader) {
    throw new AppError("JWT token não informado!", 401);
  }

  // se existir:
  const [, token] = authHeader.split(" "); // Bearer xxxxx. (tipo de token enviado ao backend)
  // split quebra o texto no caracter espaço e assim capturamos a 2º posição no array (token).

  // verifica se token é válido:
  try {
    const { sub: user_id } = verify(token, authConfig(jwt.secret)); // "sub" é onde acessamos o conteúdo no token de autenticação. Pegamos o id no usuário no token

    // inserimos o id no corpo da REQ:
    request.user = {
      id: Number(user_id), // guardando o id como número no DB
    };

    return next(); // chama a fcn destino
  } catch {
    throw new AppError("JWT inválido!", 401);
  }
}

module.exports = ensureAuthenticated;