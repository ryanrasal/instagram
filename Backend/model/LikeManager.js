const connection = require("../db");

async function fetchAllLikePublication() {
  const sql = ` SELECT * FROM likepublication`;

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      console.warn("je suis la row", rows);
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function fetchLikePublication(userId, publicationId) {
  const sql = `SELECT COUNT(*) AS likeCount, likepublication.id
    FROM likepublication
    WHERE user_id = ${userId}
    AND publication_id = ${publicationId}`;

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      console.warn("je suis la row", rows);
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function likePublication(data) {
  const sql =
    "INSERT INTO likepublication (user_id, publication_id) VALUES (?, ?)";
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

async function deleteLike(id) {
  console.warn("je suis le manager deletelike", id);
  let sqlQuery = `DELETE FROM likepublication where id = ${id}`;

  return connection
    .promise()
    .query(sqlQuery)
    .then(async ([rows]) => {
      return { status: 200, message: {} };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

module.exports = {
  fetchAllLikePublication,
  likePublication,
  fetchLikePublication,
  deleteLike,
};
