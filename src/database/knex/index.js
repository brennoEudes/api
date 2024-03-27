const config = require("../../../knexfile"); // caminho p/arquivo

const knex = require("knex"); // importe arquivo

const connection = knex(config.development); // passando p/kinex as config de conexão

module.exports = connection; // exportando p/ ser usado em diversos lugares da aplicação