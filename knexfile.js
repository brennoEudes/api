const path = require("path"); // serve p/ encontrar o endereço do arquivo database.db independente do sistema operacional.

module.exports = {
  // obj com propriedades de confing. do knex c/ db:
  development: {
    client: "sqlite3", // tipo de db
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"), // informa o caminho p/ encontrar o arquivo do db independente do sistema operacional
    },
    useNullAsDefault: true, // add prop. padrão p/ SQLite
  },
};