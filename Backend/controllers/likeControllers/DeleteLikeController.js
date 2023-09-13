const LikeManager = require("../../model/LikeManager");

async function deleteLikeController(req, res) {

  const { status, message } = await LikeManager.deleteLike(req.params.id);

  return res.status(status).json(message);
}

module.exports = deleteLikeController;