const AuthManager = require("../../model/AuthManager");

async function loginController(req, res) {
  const { status, userConnect, message } = await AuthManager.login(req.body);

  return res.status(status).json({ userConnect, message });
}

module.exports = loginController;
