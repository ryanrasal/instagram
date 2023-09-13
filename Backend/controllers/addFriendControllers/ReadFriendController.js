const FriendManager = require("../../model/FriendManager");

async function readFriendController(req, res) {
  const userConnectId = req.query.friend_id;
  const { status, message } = await FriendManager.readFriend(
    req.body,
    userConnectId
  );

  return res.status(status).json(message);
}

module.exports = readFriendController;
