const express = require("express");

const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: process.env.UPLOADS_FOLDER });

const readPublicationController = require("../controllers/publicationControllers/ReadPublicationController");

const readPublicationByUserIdController = require("../controllers/publicationControllers/ReadPublicationByUserIdController");

const createPublicationController = require("../controllers/publicationControllers/CreatePublicationController");

const deleteUserController = require("../controllers/publicationControllers/DeletePublicationController");

const fileControllers = require("../controllers/fileControllers");

/* GET : fetch all publications . */
router.get("/", readPublicationController);

/* GET : fetch all publications by userId . */
router.get("/:id", readPublicationByUserIdController);

/* DELETE : delete one Publication . */
router.delete('/:id', deleteUserController)

/* POST : POST publications  . */
router.post(
  "/",
  upload.single("picture"),
  fileControllers.fileRename,
  createPublicationController
);

module.exports = router;
