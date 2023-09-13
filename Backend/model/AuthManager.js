const connection = require("../db");

async function login({ email, password }) {
  const newEmail = email.toLowerCase();
  const newPassword = password.toLowerCase();
  let userConnect = [];
  const [rows] = await connection
    .promise()
    .query("SELECT * FROM user WHERE email = ?", [newEmail]);
  if (rows.length === 0) {
    return { status: 401, message: "Email or password is wrong" };
  }
  if (newPassword !== rows[0].password) {
    return { status: 401, message: "Email or password is wrong" };
  }
  userConnect = [rows[0]];
  console.warn(userConnect)
  return { status: 200, userConnect };
}

module.exports = {
  login,
};
