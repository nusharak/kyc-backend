
const db = require('../db');

exports.submitKYC = (userId, name, description, filePath, callback) => {
  const sql = 'INSERT INTO kyc_submissions (user_id, name, description, document_path, status) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userId, name, description, filePath, 'pending'], callback);
};

exports.updateKYC = (id, name, description, filePath, status, callback) => {
  const sql = 'UPDATE kyc_submissions SET name = ?, description = ?, document_path = ?, status = ? WHERE id = ?';
  db.query(sql, [name, description, filePath, status, id], callback);
};

exports.getAllKYC = (callback) => {
  const sql = 'SELECT k.*, u.* FROM kyc_submissions k LEFT JOIN users u ON u.id = k.user_id ORDER BY k.id DESC';
  db.query(sql, callback);
};

exports.getKYCStatus = (userId, callback) => {
  const sql = 'SELECT * FROM kyc_submissions WHERE user_id = ?';
  db.query(sql, [userId], callback);
};
exports.updateKYCAdmin=(status,id,callback)=>{
    const sql = 'UPDATE kyc_submissions SET status = ? WHERE user_id = ?';
    db.query(sql, [status, id], callback);
}
exports.getUserCount = (callback) => {
    const sql = 'SELECT COUNT(*) AS userCount FROM users WHERE role = "user"';
    db.query(sql, callback);
  };