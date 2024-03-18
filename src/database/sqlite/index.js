const sqlite3 = require("sqlite3"); // drive de conexão com a database
const sqlite = require("sqlite"); // responsável por conectar

const path = require("path");

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),

    // drive de conexão:
    driver: sqlite3.Database,
  });

  return database;
}

module.exports = sqliteConnection;
