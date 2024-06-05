const knex = require("../database/knex");

class TagController {
  // fcn p/ listar todas as tags cadastradas do usuário:
  async index(request, response) {
    //const { user_id } = request.params;
    const user_id = request.user.id;

    const tags = await knex("tags") // busca na tabela tags os elementos abaixo:
      .where({ user_id })
      .groupBy("name"); // agrupa por nome e evita duplicidade na renderização

    return response.json(tags);
  }
}

module.exports = TagController;
