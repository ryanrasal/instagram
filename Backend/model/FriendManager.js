const connection = require("../db");

async function readFriend(data, userConnectId) {
  try {
    const sql = `
      SELECT f.*, 
             u.id,
             u.firstname,
             u.lastname,
             u.image
      FROM friendship f
      JOIN user AS u ON f.user_id = u.id
      WHERE f.friend_id = ${userConnectId} AND f.status = 'pending'
    `;

    const [rows] = await connection.promise().query(sql);

    return { status: 200, message: rows };
  } catch (error) {
    return { status: 500, message: error };
  }
}

async function insertAddFriend(data) {
  console.warn("DATA MANAGER", data);
  const sql =
    "INSERT INTO friendship (friend_id, user_id, status) VALUES (?, ?, ?)";

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

async function updateFriend(id, data) {
  console.log("manager uptade", id, data);
  let sqlQuery = "UPDATE friendship SET ";

  for (let key in (itemValue = Object.keys(data))) {
    sqlQuery += `${itemValue[key]} = ?, `;
  }

  sqlQuery = sqlQuery.slice(0, sqlQuery.length - 2);

  sqlQuery += ` WHERE id = ${id}`;

  let bodyResponse = { ...data };

  return connection
    .promise()
    .query(sqlQuery, Object.values(data))
    .then(async ([rows]) => {
      return { status: 201, message: bodyResponse };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

module.exports = {
  insertAddFriend,
  updateFriend,
  readFriend,
};
