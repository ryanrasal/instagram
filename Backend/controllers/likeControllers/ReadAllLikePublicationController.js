const LikeManager = require("../../model/LikeManager");

async function readAllLikePublicationController(req, res) {

  const { status, message } = await LikeManager.fetchAllLikePublication();

  return res.status(status).json(message);
}

module.exports = readAllLikePublicationController;
