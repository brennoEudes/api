// Configuração de upload de imgs

const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

// como a const vai armazenar infos q serão usadas como configuração, usamos caixa alta:
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); // tmp é uma pasta temporária na raíz q recebe os arquivos do upload
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); // pasta p/ armazenar os aquivos do upload

// multer é a biblio p/ fazer o upload
const MULTER = {
    // a) informa a localização p/ receber o arquivo
  storage: multer.diskStorage({
    destination: TMP_FOLDER, // onde vamos enviar o arquivo

    // b) informa o nome do arquivo
    filename(request, file, callback) {
      // nome do arquivo
      const fileHash = crypto.randomBytes(10).toString("hex"); // critprografamos p/ evitar arquivos homônimos e a consequente sobreposição de arquivos
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
