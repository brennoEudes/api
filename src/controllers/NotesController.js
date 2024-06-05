const { response } = require("express");
const knex = require("../database/knex");

class NotesController {
  //CREATE
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    //const { user_id } = request.params;
    const user_id = request.user.id;

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

    return response.json();
  }

  // READ (LISTA DADO ESPECÍFICO)
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

  // INDEX (LISTA TUDO!)
  async index(request, response) {
    const { title, tags } = request.query;

    const user_id = request.user.id;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());
      //console.log(filterTags);

      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"]) // buscando na tab notes
        .where("notes.user_id", user_id) // filtra baseado no id do user
        .whereLike("title", `%${title}%`)
        .whereIn("name", filterTags) // filtra baseado nas tags, passando o vetor de verificação "filterTags"
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id") // filtra pelo id, evitando repetição
        .orderBy("notes.title"); // busca nota de um único usuário e em ordem alfabética
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`) // busca no DB por resultados que contenham a palavra. Ñ precisa ser exato
        .orderBy("title"); // busca nota de um único usuário e em ordem alfabética
    }

    const userTags = await knex("tags").where({ user_id }); // busca tags por id do user

    // percorre todas as notes
    const notesWithTags = notes.map((note) => {
      // filtrando as tags de uma note, em q o note_id seja igual ao id do user:
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(notesWithTags); // retorna o noteWith Tags!
  }
}

module.exports = NotesController;
