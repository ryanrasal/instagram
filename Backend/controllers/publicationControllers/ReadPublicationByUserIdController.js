const PublicationManager = require('../../model/PublicationManager');

async function readPublicationByUserIdController(req, res) {
    const {status, message} = await PublicationManager.fetchPublicationById(req.params.id);
    
    return res.status(status).json(message)
}

module.exports = readPublicationByUserIdController;