const connection = require("../db");
const { passwordHasher } = require("../services/PasswordHelper");

async function fetchUser() {
  const sql = "SELECT * FROM user";

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function insertUser(data) {
  const sql =
    "INSERT INTO user (firstname, lastname, pseudo, followers, suivies, images, role, email, password, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  data.password = await passwordHasher(data.password);

  let bodyResponse = { ...data };

  return connection
    .promise()
    .query(sql, Object.values(data))
    .then(async ([rows]) => {
      bodyResponse.id = rows.insertId;

      return { status: 201, message: bodyResponse };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

module.exports = {
  fetchUser,
  insertUser,
};
