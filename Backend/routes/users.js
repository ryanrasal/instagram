const express = require("express");
const router = express.Router();

const readUserController = require("../controllers/userControllers/ReadUserController");

/* GET : fetch all users . */
router.get("/", readUserController);

module.exports = router;
