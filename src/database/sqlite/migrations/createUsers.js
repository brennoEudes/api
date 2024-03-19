// Trazendo o código que seria criado manualmente em um SGBD p/ arquivo JS:

// obs: "Create table if not exists" criar nova tabela somente se ñ existir uma c/ msm nome:
const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  )
`;

module.exports = createUsers;
