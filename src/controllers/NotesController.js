const { response } = require("express");
const knex = require("../database/knex");

class NotesController {
  //CREATE
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    // OBS: envolvendo "note_id" com [] devido a atualização do knex
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    // recebendo o obj c/ 2 links e mudando o link p/ url (ver exemplo Insomnia):
    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    // inserindo os links:
    await knex("links").insert(linksInsert);

    // recebendo o obj c/ 2 tags:
    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    // inserindo as tags:
    await knex("tags").insert(tagsInsert);

    response.json();
  }

  // READ
  async read(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first(); // buscando nota pelo id e somente uma.
    const tags = await knex("tags").where({ note_id: id }).orderBy("name"); // buscando tag por pelo id e em ordem alfabética
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at"); // buscando tag por pelo id e em ordem de criação

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  // DELETE
  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json();
  }

  // INDEX
  async index(request, response) {
    const { user_id } = request.query;

    const notes = await knex("notes").where({ user_id }).orderBy("title"); // busca nota de um único usuário e em ordem alfabética

    return response.json(notes);
  }

}

module.exports = NotesController;
