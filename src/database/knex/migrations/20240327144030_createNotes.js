// processo de criar tabela:
exports.up = (knex) =>
  knex.schema.createTable("notes", (table) => {
    // campos da tabela:
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users"); // criando campo do tipo inteiro, em q user_id faz referência ao id q existe dentro da tabela do usuário. Ou seja, ñ será possível criar nota se ñ tiver usuário.

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

// processo de deletar tabela:
exports.down = (knex) => knex.schema.dropTable("notes");
