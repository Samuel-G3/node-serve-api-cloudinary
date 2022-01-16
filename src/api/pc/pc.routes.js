const PcRoutes = require("express").Router();
const { isAdmin } = require("../../middlewares/auth");
const { postNewPc, getAllPcs, getPc, patchPc, /* deletePc, */} = require("./pc.controller");
const upload = require("../../middlewares/file");

PcRoutes.get("/", getAllPcs);
PcRoutes.get("/:model", getPc);
PcRoutes.post("/", [isAdmin], upload.single("img"), postNewPc);
PcRoutes.patch("/:id", [isAdmin], patchPc);
/* PcRoutes.delete("/:model", [isAuth], deletePc); */

module.exports = PcRoutes;