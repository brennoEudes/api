// Configurações de autenticação da aplicação:

// geração de token:
module.exports = {
  jwt: {
    secret: "default", // frase secreta
    expiresIn: "1d" // tempo de expiração
  },
};
