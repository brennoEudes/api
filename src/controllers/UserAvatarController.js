// Criamos um novo controller, pois o mét "update" já exite no userController, não sendo assim uma boa prática ter os dois.

const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id; // pegando id
    const avatarFileName = request.file.filename; // pegando nome do arq

    const diskStorage = new DiskStorage();

    const user = await knex("users") // busca na tabela de usuários os elementos abaixo:
      .where({ id: user_id })
      .first();

    // se não houver usuário autenticado:
    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem editar a foto de perfil!",
        401
      );
    }

    // se usuário autenticado, checa se há foto no avatar:
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar); // deleta foto antiga
    }

    const filename = await diskStorage.saveFile(avatarFileName); // pega a nova foto
    user.avatar = filename; // insere nova foto no avatar

    await knex("users").update(user).where({ id: user_id }); // salva nova foto no db no user correspondente

    return response.json(user); // retorna user c/ img atualizada
  }
}

module.exports = UserAvatarController;
