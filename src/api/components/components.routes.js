const ComponentRoutes = require("express").Router();
const { isAdmin } = require("../../middlewares/auth");
const { postNewComponent, getAllComponents, getComponent, patchComponent, deleteComponent} = require("./components.controller");

ComponentRoutes.get("/", getAllComponents);
ComponentRoutes.get("/:id", getComponent);
ComponentRoutes.post("/", [isAdmin], postNewComponent);
ComponentRoutes.patch("/:id", [isAdmin], patchComponent);
ComponentRoutes.delete("/:id", [isAdmin], deleteComponent);

module.exports = ComponentRoutes;