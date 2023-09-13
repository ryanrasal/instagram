const PublicationManager = require("../../model/PublicationManager");
const qs = require("qs");

async function readPublicationController(req, res) {
  const { status, message } = await PublicationManager.fetchPublication();

  return res.status(status).json(message);
}

module.exports = readPublicationController;
