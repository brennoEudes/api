const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index); // passando o id do USUÁRIO na params

module.exports = tagsRoutes;
