const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

// fcn p/ executar as migrations:
async function migrationsRun() {
  //se refere as tabelas que o DB terá:
  const schemas = [
    // pegando as migrations:
    createUsers,
  ].join(" "); // parâmtro p/ juntar

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.log(error));
}

module.exports = migrationsRun;
