exports.up = function (knex) {
  knex.schema.createTable("tags", (table) => {
    // campos da tabela:
    table.increments("id");
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE"); // mét "efeito cascata", ou seja, se uma tag for deletada, deleta tb todas as notas q estejam vinculadas a essa tag, garantido consistência p/ DB;
    table.integer("user_id").references("id").inTable("users");
    table.text("name").notNullable(); // mét q não aceita nulo
  });
};

exports.down = (knex) => knex.schema.dropTable("tags");
