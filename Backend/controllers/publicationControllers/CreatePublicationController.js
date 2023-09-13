const PublicationManager = require("../../model/PublicationManager");

async function createPublicationController(req, res) {

  const publication = JSON.parse(req.body.publication);

  const { renamedFile } = req;

  publication.imageVideoURL = renamedFile;

  const { status, message } = await PublicationManager.insertPublication(
    publication
  );

  return res.status(status).json(message);
}

module.exports = createPublicationController;
