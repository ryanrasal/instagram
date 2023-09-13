const express = require("express");
const router = express.Router();

const readAllLikePublicationController = require("../controllers/likeControllers/ReadAllLikePublicationController");

const readLikePublicationController = require("../controllers/likeControllers/ReadLikeController");

const addLikeController = require("../controllers/likeControllers/AddLikeController");

const deleteLikeController = require("../controllers/likeControllers/DeleteLikeController");

/* GET  */
router.get("/", readAllLikePublicationController);

/* GET : Recupere all like of the publication. */
router.get("/byId", readLikePublicationController);

/* POST : add new like. */
router.post("/", addLikeController);

/* DELETE : like. */
router.delete("/:id", deleteLikeController);

module.exports = router;
