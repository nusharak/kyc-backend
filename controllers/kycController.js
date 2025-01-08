const kycModel = require('../models/kycModel');

exports.submitKYC = (req, res) => {
  const { name, description } = req.body;
  const filePath = req.file ? req.file.path : '';

  kycModel.submitKYC(req.user.id, name, description, filePath, (err, result) => {
    if (err) return res.status(500).send('Database error');
    res.status(200).send('KYC submission successful');
  });
};

exports.updateKYC = (req, res) => {
  const { name, description, status = 'pending' } = req.body;
  const filePath = req.file ? req.file.path : '';

  kycModel.updateKYC(req.params.id, name, description, filePath, status, (err, result) => {
    if (err) return res.status(500).send('Database error');
    res.status(200).send('KYC status updated');
  });
};

exports.getAdminKYC = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  kycModel.getAllKYC((err, result) => {
    if (err) return res.status(500).send('Database error');
    
    res.json(result);
  });
};
exports.updateKYCAdmin =(req,res)=>{

if (req.user.role !== 'admin') return res.status(403).send('Access denied');

  const { status } = req.body;
  kycModel.updateKYCAdmin(status,req.params.id,(err,result) => {
    if (err) return res.status(500).send('Database error');
    res.status(200).send('KYC status updated');
  })
  
 
};
exports.getUserCount = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    kycModel.getUserCount((err, result) => {
      if (err) return res.status(500).send('Database error');
      
      res.json(result[0]);
    });
  };
  
exports.getKYCStatus = (req, res) => {
  kycModel.getKYCStatus(req.user.id, (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json({ exists: results.length > 0, kyc: results[0] });
  });
};
