const express = require("express");
const router = express.Router();

const addFriendController = require("../controllers/addFriendControllers/AddFriendController");

const updateFriendController = require("../controllers/addFriendControllers/UpdateFriendController");

const readFriendController = require("../controllers/addFriendControllers/ReadFriendController");

/* POST : add new friend. */
router.get("/", readFriendController);

/* POST : add new friend. */
router.post("/", addFriendController);

/* Put : friend. */
router.put("/:id", updateFriendController);

module.exports = router;
