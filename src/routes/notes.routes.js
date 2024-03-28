const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create); // passando o id do USUÁRIO como parâmetro
notesRoutes.get("/", notesController.index); // passando o id do USUÁRIO na query

notesRoutes.get("/:id", notesController.read); // passando o id da NOTA como parâmetro
notesRoutes.delete("/:id", notesController.delete); // passando o id da NOTA como parâmetro

module.exports = notesRoutes;
