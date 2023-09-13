const connection = require("../db");

async function fetchPublication() {
  const sql = `SELECT 
  publication.id,
  publication.imageVideoURL,
  publication.legende,
  publication.DatePublication,
  COUNT(likepublication.id) AS nbLikes,
  user.image AS userImage,
  user.lastname AS userLastname,
  user.firstname AS userFirstname,
  likepublication.user_id,
  likepublication.publication_id
  FROM publication
  LEFT JOIN likepublication ON publication.id = likepublication.publication_id
  LEFT JOIN user ON publication.user_id = user.id
  GROUP BY publication.id;`;

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

async function insertPublication(data) {
  const sql =
    "INSERT INTO publication (user_id, legende, DatePublication, imageVideoURL) VALUES (?, ?, ?, ?)";
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

async function fetchPublicationById(userId) {
  const sql = `
      SELECT publication.id, publication.user_id, publication.imageVideoURL, publication.legende, publication.DatePublication, user.firstname, user.lastname, user.pseudo
      FROM publication
      INNER JOIN user ON publication.user_id = user.id
      WHERE publication.user_id = ?;
    `;

  return connection
    .promise()
    .query(sql, [userId])
    .then(async ([rows]) => {
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function deletePublication(id) {
  let sqlQuery = `DELETE FROM publication where id = ${id}`;

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
  fetchPublication,
  fetchPublicationById,
  insertPublication,
  deletePublication,
};
