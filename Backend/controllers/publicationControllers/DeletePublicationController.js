const PublicationManager = require('../../model/PublicationManager');

async function deletePublicationController(req, res) {
    const {status, message} = await PublicationManager.deletePublication(req.params.id);
    
    return res.status(status).json(message)
}

module.exports = deletePublicationController;