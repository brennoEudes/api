const { fs } = require("fs"); // prop. node p/ manipulação de arquivos
const path = require("path"); // permite a navegação entre repos
const uploadConfig = require("../configs/upload");

class DiskStorage {
  // a) fcn para salvar um arq:
  async saveFile(file) {
    await fs.promises.rename(
      // a fcn rename é p/ mudar o arq de lugar
      path.resolve(uploadConfig.TMP_FOLDER, file), // pega o arq
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) // aloca o arq
    );

    return file;
  }

  // b) fcn para deletar um arq:
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    // tratamento de erros, por garantia:
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
