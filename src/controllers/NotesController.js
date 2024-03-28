const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    // OBS: envolvendo "note_id" com {} devido a atualização do knex
    const {note_id} = await knex("notes").insert({
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
}

module.exports = NotesController;
