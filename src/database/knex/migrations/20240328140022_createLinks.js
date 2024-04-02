exports.up = (knex) =>
  knex.schema.createTable("links", (table) => {
    // campos da tabela:
    table.increments("id");
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.text("url").notNullable(); // mét q não aceita nulo

    table.timestamp("created_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("links");
