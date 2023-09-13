const FriendManager = require("../../model/FriendManager");

async function updateFriendController(req, res) {
  const { status, message } = await FriendManager.updateFriend(req.params.id, req.body);

  return res.status(status).json(message);
}

module.exports = updateFriendController;
