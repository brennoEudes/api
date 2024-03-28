const { Router } = require("express"); 

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router(); 

const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create); // passando o id do usuário c/ parâmetro

module.exports = notesRoutes;
