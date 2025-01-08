const db = require('../db'); // Assuming a separate file to manage DB connection

exports.registerUser = (username, email, password, role, callback) => {
  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, password, role], callback);
};

exports.findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};
