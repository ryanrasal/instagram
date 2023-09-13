const LikeManager = require("../../model/LikeManager");

async function addLikePublication(req, res) {

  const { status, message } = await LikeManager.likePublication(req.body);

  return res.status(status).json(message);
}

module.exports = addLikePublication;
